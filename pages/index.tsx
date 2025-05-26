import Head from 'next/head'
import GoldenCircleForm from '../components/GoldenCircleForm'

export default function Home() {
    return (
        <>
            <Head>
                <title>승리복음 매일 묵상 플래너</title>
                <meta name="description" content="골든 서클 방식으로 매일 말씀을 묵상하고 기록하세요." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main>
                <GoldenCircleForm />
                <footer className="text-center text-yellow-700 mt-12 mb-4">
                    © {new Date().getFullYear()} 승리복음 매일 묵상 플래너
                </footer>
            </main>
        </>
    )
}
