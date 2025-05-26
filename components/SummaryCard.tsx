import React from 'react'

interface Props {
    form: {
        date: string
        scripture: string
        keyVerse: string
        why: string
        how: string
        what: string
        prayer: string
        summary: string
    }
    onEdit: () => void
}

export default function SummaryCard({ form, onEdit }: Props) {
    return (
        <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-yellow-700 text-center mb-2">✨ 오늘의 묵상 요약 ✨</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="mb-2"><span className="font-semibold text-yellow-800">📅 날짜:</span> {form.date}</div>
                    <div className="mb-2"><span className="font-semibold text-yellow-800">📖 본문 말씀:</span> {form.scripture}</div>
                    <div className="mb-2"><span className="font-semibold text-yellow-800">📍 핵심 구절:</span> {form.keyVerse}</div>
                </div>
                <div>
                    <div className="mb-2"><span className="font-semibold text-yellow-800">💬 오늘의 한 줄:</span> {form.summary}</div>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-yellow-900 mb-1">1️⃣ WHY – 왜 이 말씀이 중요한가?</h3>
                <p className="whitespace-pre-line">{form.why}</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-900 mb-1">2️⃣ HOW – 어떻게 살아야 하는가?</h3>
                <p className="whitespace-pre-line">{form.how}</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-900 mb-1">3️⃣ WHAT – 무엇을 할 것인가?</h3>
                <p className="whitespace-pre-line">{form.what}</p>
            </div>
            <div>
                <h3 className="font-bold text-yellow-900 mb-1">🙏 골든 서클 기도문</h3>
                <p className="whitespace-pre-line">{form.prayer}</p>
            </div>
            <button
                onClick={onEdit}
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded transition mt-4"
            >
                다시 작성하기
            </button>
        </div>
    )
}
