import React from 'react'
import { DiaryItem } from './DiaryList'

interface EgwCardProps {
    form: DiaryItem
    onEdit: () => void
}

export default function EgwCard({ form, onEdit }: EgwCardProps) {
    return (
        <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 mt-8 space-y-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">✨ 영감의 글 묵상 요약 ✨</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="mb-2"><span className="font-semibold text-blue-800">📅 날짜:</span> {form.date}</div>
                    <div className="mb-2"><span className="font-semibold text-blue-800">📚 책 제목:</span> {form.bookTitle}</div>
                    {form.author && <div className="mb-2"><span className="font-semibold text-blue-800">✍️ 저자:</span> {form.author}</div>}
                    <div className="mb-2"><span className="font-semibold text-blue-800">📄 페이지:</span> {form.pageRange}</div>
                </div>
                <div>
                    <div className="mb-2"><span className="font-semibold text-blue-800">🏷️ 태그:</span> {form.tags}</div>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-blue-900 mb-1">📖 본문 발췌</h3>
                <p className="whitespace-pre-line">{form.excerpt}</p>
            </div>
            <div>
                <h3 className="font-bold text-blue-900 mb-1">🔑 핵심 구절/키워드</h3>
                <p className="whitespace-pre-line">{form.egwKey}</p>
            </div>
            {form.reflection && (
                <div>
                    <h3 className="font-bold text-blue-900 mb-1">💡 느낀 점/적용</h3>
                    <p className="whitespace-pre-line">{form.reflection}</p>
                </div>
            )}
            <div>
                <h3 className="font-bold text-blue-900 mb-1">🙏 묵상 기도</h3>
                <p className="whitespace-pre-line">{form.egwPrayer}</p>
            </div>
            <button
                onClick={onEdit}
                className="w-full bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded transition mt-4"
            >
                수정
            </button>
        </div>
    )
} 
