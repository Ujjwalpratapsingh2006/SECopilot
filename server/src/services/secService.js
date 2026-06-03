import 'dotenv/config';

// The SEC requires a User-Agent header in the format: <AppName> <ContactEmail>
const USER_AGENT = `SECopilot ${process.env.SEC_EMAIL || 'placeholder@example.com'}`;
const HEADERS = { 'User-Agent': USER_AGENT };

/**
 * Gets the CIK (Central Index Key) for a given stock ticker.
 * The SEC API uses CIKs to identify companies, not tickers.
 */
export async function getCikForTicker(ticker) {
    try {
        const response = await fetch('https://www.sec.gov/files/company_tickers.json', { headers: HEADERS });
        if (!response.ok) throw new Error(`Failed to fetch tickers: ${response.statusText}`);
        
        const data = await response.json();
        
        // The data is an object of objects. We need to search for the ticker.
        const companyList = Object.values(data);
        const company = companyList.find(c => c.ticker === ticker.toUpperCase());
        
        if (!company) {
            throw new Error(`Ticker ${ticker} not found in SEC database.`);
        }
        
        // SEC CIKs in URLs are often 10 digits zero-padded. 
        // e.g. 320193 -> 0000320193
        return company.cik_str.toString().padStart(10, '0');
    } catch (error) {
        console.error("Error in getCikForTicker:", error);
        throw error;
    }
}

/**
 * Fetches the metadata for the latest filing of a specific type (e.g., '10-K') for a CIK.
 */
export async function getLatestFilingMetadata(cik, formType = '10-K') {
    try {
        // Fetch company submissions. CIK must be zero-padded to 10 digits here.
        const response = await fetch(`https://data.sec.gov/submissions/CIK${cik}.json`, { headers: HEADERS });
        if (!response.ok) throw new Error(`Failed to fetch submissions for CIK ${cik}: ${response.statusText}`);
        
        const data = await response.json();
        const filings = data.filings.recent;
        
        // Find the index of the first filing that matches the formType
        const index = filings.form.findIndex(f => f === formType);
        
        if (index === -1) {
            throw new Error(`No ${formType} filing found for CIK ${cik}`);
        }
        
        // Extract the accession number and primary document name
        const accessionNumber = filings.accessionNumber[index];
        const primaryDocument = filings.primaryDocument[index];
        
        return {
            accessionNumber,
            primaryDocument
        };
    } catch (error) {
        console.error("Error in getLatestFilingMetadata:", error);
        throw error;
    }
}

/**
 * Downloads the actual HTML document for the filing.
 */
export async function downloadFilingHtml(cik, accessionNumber, primaryDocument) {
    try {
        // The URL format requires the CIK (not zero-padded) and the accession number without hyphens.
        const unpaddedCik = parseInt(cik, 10).toString();
        const noHyphenAccession = accessionNumber.replace(/-/g, '');
        
        const url = `https://www.sec.gov/Archives/edgar/data/${unpaddedCik}/${noHyphenAccession}/${primaryDocument}`;
        console.log(`Downloading filing from: ${url}`);
        
        const response = await fetch(url, { headers: HEADERS });
        if (!response.ok) throw new Error(`Failed to download document: ${response.statusText}`);
        
        const htmlContent = await response.text();
        return htmlContent;
    } catch (error) {
        console.error("Error in downloadFilingHtml:", error);
        throw error;
    }
}

/**
 * Orchestrator function: Takes a ticker and form type, and returns the full HTML document.
 */
export async function fetchSecDocument(ticker, formType = '10-K') {
    console.log(`Starting fetch process for ${ticker} ${formType}...`);
    const cik = await getCikForTicker(ticker);
    console.log(`Found CIK for ${ticker}: ${cik}`);
    
    const { accessionNumber, primaryDocument } = await getLatestFilingMetadata(cik, formType);
    console.log(`Found latest ${formType} metadata. Accession: ${accessionNumber}`);
    
    const html = await downloadFilingHtml(cik, accessionNumber, primaryDocument);
    console.log(`Successfully downloaded HTML document. Size: ${html.length} characters.`);
    
    return html;
}
