"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ApiTesterPage() {
  const [apiKey, setApiKey] = useState("");
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [endpointName, setEndpointName] = useState("");
  const [from, setFrom] = useState('2024-01-01');
  const [to, setTo] = useState(new Date().toISOString().split('T')[0]);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const fetchApi = async (url: string, name: string) => {
    setLoading(true);
    setError("");
    setResponseData(null);
    setEndpointName(name);
    try {
      const res = await fetch(`${backendUrl}${url}`, {
        headers: { Authorization: `Key ${apiKey}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || `Failed to fetch ${name}`);
      }
      setResponseData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen md:mt-12 mt-24 pt-28 pb-4 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <article className="mx-auto max-w-5xl">
        <header className="mb-10 border-b-2 border-gray-300 dark:border-gray-700 pb-8 text-center sm:text-left">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            API Visualizer
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            A simple tool to visualize responses from the Loan and LOS APIs.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg mb-8 border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Configuration
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Admin API Key
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter EXPORT_API_KEY if required"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Loan Status Card */}
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg border dark:border-gray-700 transition hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Loan Status API
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 h-10">
              Fetches all generic loan application statuses from the backend.
            </p>
            <button
              onClick={() => fetchApi("/api/loans/status", "Loan Status")}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium shadow-sm"
            >
              {loading && endpointName === "Loan Status"
                ? "Fetching..."
                : "Fetch Loan Status"}
            </button>
          </div>

          {/* Export Loan API Card */}
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg border dark:border-gray-700 transition hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Export Loan Applications
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10">
              Fetches the full export data of all loan applications.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                <input type="date" className="w-full text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none transition" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                <input type="date" className="w-full text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none transition" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
            </div>
            <button
              onClick={() => fetchApi(`/api/loans/export?from=${from}&to=${to}`, "Export Applications")}
              disabled={loading}
              className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors font-medium shadow-sm"
            >
              {loading && endpointName === "Export Applications"
                ? "Fetching..."
                : "Export Applications"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error processing request</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {responseData && (
          <div className="bg-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-700 transition">
            <div className="bg-gray-800 text-white p-4 font-semibold flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 gap-2">
              <span className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                JSON Response ({endpointName})
              </span>
              <span className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-300 font-mono">
                {Array.isArray(responseData.data || responseData) 
                  ? `${(responseData.data || responseData).length} items returned` 
                  : 'Object returned'}
              </span>
            </div>
            <div className="p-4 overflow-auto max-h-[600px] custom-scrollbar bg-[#0d1117]">
              <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        <div className="mt-10 text-center">
             <Link href="/" className="inline-block rounded-lg bg-gray-200 dark:bg-gray-700 px-6 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                &larr; Back to home
             </Link>
        </div>
      </article>
    </main>
  );
}
