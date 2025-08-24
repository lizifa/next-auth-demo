import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

/**
 * 受保护的API接口示例 (App Router版本)
 * 
 * 使用方法：
 * 1. 前端需要先通过 NextAuth 登录
 * 2. 调用此API时会自动验证登录状态
 * 3. 未登录用户会收到 401 错误
 * 4. 已登录用户可以获得用户信息和API响应
 * 
 * 前端调用示例：
 * ```typescript
 * // 确保用户已登录
 * const { data: session } = useSession();
 * 
 * if (session) {
 *   // 调用API
 *   const response = await fetch('/api/app/helloApi', {
 *     method: 'GET',
 *     headers: {
 *       'Content-Type': 'application/json',
 *     },
 *   });
 *   
 *   if (response.ok) {
 *     const data = await response.json();
 *     console.log(data);
 *   }
 * }
 * ```
 */

export async function GET(request: NextRequest) {
    try {
        // 验证用户登录状态
        const session = await auth();
        
        // 检查是否已登录
        if (!session || !session.user) {
            return NextResponse.json(
                {
                    message: '未授权访问',
                    error: '请先登录'
                },
                { status: 401 }
            );
        }

        // 用户已登录，处理业务逻辑
        return NextResponse.json({
            message: 'Hello API 调用成功',
            user: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('API 错误:', error);
        return NextResponse.json(
            {
                message: '服务器错误',
                error: '处理请求时发生错误'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // 验证用户登录状态
        const session = await auth();
        
        // 检查是否已登录
        if (!session || !session.user) {
            return NextResponse.json(
                {
                    message: '未授权访问',
                    error: '请先登录'
                },
                { status: 401 }
            );
        }

        // 获取请求体数据
        const body = await request.json();

        // 用户已登录，处理业务逻辑
        return NextResponse.json({
            message: 'POST请求处理成功',
            receivedData: body,
            user: session.user.name,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('API 错误:', error);
        return NextResponse.json(
            {
                message: '服务器错误',
                error: '处理请求时发生错误'
            },
            { status: 500 }
        );
    }
}
