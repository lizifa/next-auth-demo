'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ApiExample() {
  const { data: session, status } = useSession();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getSession = async () => {
    setLoading(true);
    try {
      // await fetch('/api/app/helloApi');

      const response = await fetch('/api/auth/session');
      const data = await response.json();
      setSessionInfo(data);
    } catch (error) {
      console.error('获取会话失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/api-example' });
      setSessionInfo(null);
      alert('已登出');
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  return (
    <div className="font-sans p-8 max-w-4xl mx-auto">
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">会话管理</h2>
          
          <div className="space-y-4">
            <button
              onClick={getSession}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
            >
              {loading ? '获取中...' : '获取当前会话'}
            </button>

            <button
              onClick={() => signIn('github', { callbackUrl: '/api-example' })}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
            >
              {loading ? '获取中...' : 'github登录'}
            </button>
            
            {sessionInfo && (
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">会话信息：</h3>
                <pre className="text-sm overflow-auto bg-white p-2 rounded border">
                  {JSON.stringify(sessionInfo, null, 2)}
                </pre>
              </div>
            )}
            
            {sessionInfo?.user && (
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                登出
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">OAuth 登录流程</h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
              <p className="text-yellow-800">
                <strong>注意：</strong> OAuth 登录需要通过重定向进行，无法直接通过 API 调用完成。
                您需要将用户重定向到以下 URL：
              </p>
            </div>
            
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">GitHub 登录：</label>
                <code className="bg-gray-100 px-3 py-2 rounded text-sm block">
                  /api/auth/signin/github
                </code>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Google 登录：</label>
                <code className="bg-gray-500 px-3 py-2 rounded text-sm block">
                  /api/auth/signin/google
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">API 端点说明</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">GET /api/auth/session</span>
              <span className="text-gray-600">获取当前用户会话信息</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">POST /api/auth/signout</span>
              <span className="text-gray-600">登出当前用户</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">GET /api/auth/csrf</span>
              <span className="text-gray-600">获取 CSRF 保护令牌</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">GET /api/auth/providers</span>
              <span className="text-gray-600">获取可用的认证提供商</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
