'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface ApiResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  timestamp: string;
}

export default function ProtectedApiExample() {
  const { data: session, status } = useSession();
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callProtectedApi = async (method: 'GET' | 'POST' = 'GET') => {
    if (!session) {
      setError('请先登录');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // 如果是POST请求，添加一些测试数据
      if (method === 'POST') {
        options.body = JSON.stringify({
          testData: '这是POST请求的测试数据',
          timestamp: new Date().toISOString(),
        });
      }

      const response = await fetch('/api/app/helloApi', options);

      if (response.ok) {
        const data = await response.json();
        setApiResponse(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'API调用失败');
      }
    } catch (err) {
      setError('网络错误或服务器错误');
      console.error('API调用错误:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="p-4">加载中...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          需要登录
        </h3>
        <p className="text-yellow-700">
          请先登录以访问受保护的API接口
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">受保护API测试</h2>
      
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">当前用户信息</h3>
        <p className="text-green-700">
          欢迎, {session?.user?.name} ({session?.user?.email})
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={() => callProtectedApi('GET')}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '调用中...' : '测试GET请求'}
          </button>
          
          <button
            onClick={() => callProtectedApi('POST')}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '调用中...' : '测试POST请求'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {apiResponse && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">API响应:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
