import React, { useState, useEffect } from 'react'
import { DiaryItem } from './DiaryList'

interface EgwFormProps {
    initialForm?: DiaryItem | null
    onSave: (item: DiaryItem) => void
    onCancel: () => void
    isEditMode: boolean
}

const emptyForm: Omit<DiaryItem, 'id' | 'type'> = {
    date: '',
    bookTitle: '',
    author: '',
    pageRange: '',
    excerpt: '',
    egwKey: '',
    reflection: '',
    egwPrayer: '',
    tags: '',
}

export default function EgwForm({ initialForm, onSave, onCancel, isEditMode }: EgwFormProps) {
    const [form, setForm] = useState<Omit<DiaryItem, 'id' | 'type'>>(emptyForm)

    useEffect(() => {
        if (initialForm) {
            const { id, type, ...rest } = initialForm
            setForm({ ...emptyForm, ...rest })
        } else {
            setForm(emptyForm)
        }
    }, [initialForm])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const id = initialForm?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        onSave({ id, type: 'egw', ...form })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white/80 rounded-xl shadow-lg p-8 space-y-6 mt-8"
        >
            <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">✨ 예언의 신 묵상 기록 ✨</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block font-semibold text-blue-800">📅 날짜</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold text-blue-800">📚 책 제목</label>
                    <input
                        type="text"
                        name="bookTitle"
                        value={form.bookTitle}
                        onChange={handleChange}
                        placeholder="예: 정로의 계단"
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block font-semibold text-blue-800">✍️ 저자 <span className='text-xs text-gray-400'>(선택)</span></label>
                    <input
                        type="text"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        placeholder="예: 엘렌 G. 화잇"
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold text-blue-800">📄 페이지 범위</label>
                    <input
                        type="text"
                        name="pageRange"
                        value={form.pageRange}
                        onChange={handleChange}
                        placeholder="예: 12~15쪽"
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block font-bold text-blue-900 mb-1">📖 본문 발췌</label>
                <textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    placeholder="인상 깊은 문장, 단락 등 발췌"
                    className="w-full mt-1 p-2 border rounded"
                    rows={3}
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-blue-900 mb-1">🔑 핵심 구절/키워드</label>
                <input
                    type="text"
                    name="egwKey"
                    value={form.egwKey}
                    onChange={handleChange}
                    placeholder="한 문장 요약 또는 키워드"
                    className="w-full mt-1 p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-blue-900 mb-1">💡 느낀 점/적용 <span className='text-xs text-gray-400'>(선택)</span></label>
                <textarea
                    name="reflection"
                    value={form.reflection}
                    onChange={handleChange}
                    placeholder="내 삶에 적용할 점, 느낀 점 등"
                    className="w-full mt-1 p-2 border rounded"
                    rows={2}
                />
            </div>
            <div>
                <label className="block font-bold text-blue-900 mb-1">🙏 묵상 기도</label>
                <textarea
                    name="egwPrayer"
                    value={form.egwPrayer}
                    onChange={handleChange}
                    placeholder="오늘의 적용, 결단, 기도문 등"
                    className="w-full mt-1 p-2 border rounded"
                    rows={3}
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-blue-900 mb-1">🏷️ 태그 <span className='text-xs text-gray-400'>(선택, 콤마로 구분)</span></label>
                <input
                    type="text"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="믿음, 순종, 소망 등"
                    className="w-full mt-1 p-2 border rounded"
                />
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="flex-1 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition"
                >
                    {isEditMode ? '수정 완료' : '저장 및 요약 보기'}
                </button>
                <button
                    type="button"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition"
                    onClick={onCancel}
                >
                    취소
                </button>
            </div>
        </form>
    )
} 
