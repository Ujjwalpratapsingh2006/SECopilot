import { z } from "zod";
import { llm } from "../../../services/llm.js";

// ============================================================
// NODE 1: ROUTER
// The "brain" of the agent. Analyzes the user's question and
// decides whether to search the SEC filing or the web.
// ============================================================
export async function routerNode(state) {
    console.log("--- ROUTER NODE ---");
    const { question } = state;

    const routingSchema = z.object({
        datasource: z.enum(["vector_store", "web_search"]).describe(
            "Route to 'vector_store' if the question is about a company's SEC filing, financial statements, revenue, risk factors, or any data found in a 10-K. Route to 'web_search' if the question is about current events, live stock prices, recent news, or anything NOT typically found in an SEC filing."
        ),
    });

    const structuredLlm = llm.withStructuredOutput(routingSchema);

    const prompt = `You are an expert at routing a user question to the correct data source.
    The available data sources are:
    1. 'vector_store': Contains SEC 10-K annual filing documents for a company. Use this for questions about revenue, expenses, risk factors, business segments, employee counts, executive compensation, legal proceedings, or any financial data from an annual report.
    2. 'web_search': Use this for questions about current events, today's stock price, recent news, market sentiment, or anything that would NOT be found in an SEC annual filing.
    
    Question: ${question}
    
    Route this question to the appropriate data source.`;

    const result = await structuredLlm.invoke(prompt);
    console.log(`-> Router Decision: ${result.datasource}`);

    return { dataSource: result.datasource };
}
