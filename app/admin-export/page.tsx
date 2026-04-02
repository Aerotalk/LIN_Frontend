"use client";

import React, { useState } from 'react';

export default function AdminExportPage() {
    const [apiKey, setApiKey] = useState('');
    const [from, setFrom] = useState('2024-01-01');
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]);
    const [statusData, setStatusData] = useState<any>(null);
    const [exportData, setExportData] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

    const fetchStatus = async () => {
        setLoading(true);
        setError('');
        setStatusData(null);
        setExportData(null);
        try {
            const res = await fetch(`${backendUrl}/api/loans/status`, {
                headers: { 'Authorization': `Key ${apiKey}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Failed to fetch status');
            setStatusData(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchExport = async () => {
        setLoading(true);
        setError('');
        setExportData(null);
        setStatusData(null);
        try {
            const res = await fetch(`${backendUrl}/api/loans/export?from=${from}&to=${to}`, {
                headers: { 'Authorization': `Key ${apiKey}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Failed to fetch export');
            setExportData(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto font-sans text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Admin API Tester</h1>
            
            <div className="bg-white shadow p-6 rounded-lg mb-8 border">
                <h2 className="text-xl font-semibold mb-4">Configuration</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                        <input 
                            type="password" 
                            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            value={apiKey} 
                            onChange={(e) => setApiKey(e.target.value)} 
                            placeholder="Enter EXPORT_API_KEY from backend .env"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Status Card */}
                <div className="bg-white shadow p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Check Loan Status</h2>
                    <p className="text-sm text-gray-500 mb-4">Fetches all application statuses</p>
                    <button 
                        onClick={fetchStatus}
                        disabled={loading || !apiKey}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Fetching...' : 'Fetch Status'}
                    </button>
                </div>

                {/* Export Card */}
                <div className="bg-white shadow p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Export Application Data</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                            <input 
                                type="date" 
                                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                                value={from} 
                                onChange={(e) => setFrom(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                            <input 
                                type="date" 
                                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                                value={to} 
                                onChange={(e) => setTo(e.target.value)} 
                            />
                        </div>
                    </div>
                    <button 
                        onClick={fetchExport}
                        disabled={loading || !apiKey}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Fetching...' : 'Fetch Full Export'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm">
                    <p className="font-bold">Error Processing Request</p>
                    <p>{error}</p>
                </div>
            )}

            {(statusData || exportData) && (
                <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-700">
                    <div className="bg-gray-800 text-white p-4 font-semibold flex justify-between items-center border-b border-gray-700">
                        <span>JSON Response Body</span>
                        <span className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-300 font-mono">
                            {statusData ? `${statusData.length} items returned` : `${exportData?.length} items returned`}
                        </span>
                    </div>
                    <div className="p-4 overflow-auto max-h-[600px] custom-scrollbar">
                        <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
                            {JSON.stringify(statusData || exportData, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
