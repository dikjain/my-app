"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const BASE_API_URL = "https://api.langflow.astra.datastax.com";
const LANGFLOW_ID = "f829f83f-e4c3-4742-89d5-9ddee4394fb0";
const FLOW_ID = "e078fe8d-f20c-4ec9-8c88-f69cc500ddf4";
const APPLICATION_TOKEN = "AstraCS:rcljgjjLklJcKXTLqJyqSdYl:81ae80ca3f28abfe7f208501360be49a08b7467a935115189c79ca84d6635381";
const ENDPOINT = "socialpulse_flow";

const runFlow = async (message: string) => {
    const api_url = `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${ENDPOINT}`;

    const payload = {
        input_value: message,
        output_type: "chat",
        input_type: "chat",
    };

    const headers = {
        Authorization: `Bearer ${APPLICATION_TOKEN}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.post(api_url, payload, { headers });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`HTTP error! status: ${error?.response?.status}`);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

const SocialMediaAnalysis = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }

        setLoading(true);
        try {
            const result = await runFlow(message);
            const output = result.outputs[0]?.outputs[0]?.results?.message?.text || "No response received";
            setResponse(output);
        } catch (error) {
            alert("An error occurred: " + (error as Error).message);
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Social Media Analysis</h1>
            <h2 className="text-lg mb-4 text-center">Model use is openai</h2>
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
            />
            <button 
                className={`w-full p-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                onClick={handleSubmit} 
                disabled={loading}
            >
                {loading ? "Running flow..." : "Analysis"}
            </button>
            {response && <div className="mt-4 p-4 border border-gray-300 rounded" dangerouslySetInnerHTML={{ __html: response }} />}
        </div>
    );
};

export default SocialMediaAnalysis;
