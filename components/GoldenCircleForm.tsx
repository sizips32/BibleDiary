import React, { useState, useEffect } from 'react'
import { DiaryItem } from './DiaryList'

interface FormProps {
    initialForm?: DiaryItem | null
    onSave: (item: DiaryItem) => void
    onCancel: () => void
    isEditMode: boolean
}

const emptyForm: Omit<DiaryItem, 'id'> = {
    date: '',
    scripture: '',
    keyVerse: '',
    why: '',
    how: '',
    what: '',
    prayer: '',
    summary: '',
    youtubeTitle: '',
    youtubeUrl: '',
}

export default function GoldenCircleForm({ initialForm, onSave, onCancel, isEditMode }: FormProps) {
    const [form, setForm] = useState<Omit<DiaryItem, 'id'>>(emptyForm)

    useEffect(() => {
        if (initialForm) {
            const { id, ...rest } = initialForm
            setForm({
                ...emptyForm,
                ...rest,
                youtubeTitle: rest.youtubeTitle || '',
                youtubeUrl: rest.youtubeUrl || '',
            })
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
        onSave({ id, ...form })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white/80 rounded-xl shadow-lg p-8 space-y-6 mt-8"
        >
            <h1 className="text-2xl font-bold text-center text-yellow-700 mb-2">✨ 승리복음 매일 묵상 플래너 ✨</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block font-semibold text-yellow-800">📅 날짜</label>
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
                    <label className="block font-semibold text-yellow-800">📖 오늘의 본문 말씀</label>
                    <input
                        type="text"
                        name="scripture"
                        value={form.scripture}
                        onChange={handleChange}
                        placeholder="예: 요한복음 15:5"
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block font-semibold text-yellow-800">🎬 유튜브 영상 제목</label>
                    <input
                        type="text"
                        name="youtubeTitle"
                        value={form.youtubeTitle}
                        onChange={handleChange}
                        placeholder="설교 영상 제목 (예: 승리하는 삶의 비결)"
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold text-yellow-800">🔗 유튜브 영상 주소</label>
                    <input
                        type="url"
                        name="youtubeUrl"
                        value={form.youtubeUrl}
                        onChange={handleChange}
                        placeholder="https://youtube.com/..."
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>
            </div>
            <div>
                <label className="block font-semibold text-yellow-800">📍 핵심 구절</label>
                <input
                    type="text"
                    name="keyVerse"
                    value={form.keyVerse}
                    onChange={handleChange}
                    placeholder="핵심 구절을 입력하세요"
                    className="w-full mt-1 p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-yellow-900 mb-1">1️⃣ WHY – 왜 이 말씀이 중요한가? (하나님의 마음)</label>
                <textarea
                    name="why"
                    value={form.why}
                    onChange={handleChange}
                    placeholder="하나님은 이 말씀을 통해 무엇을 말씀하시는가? (예: 주님은 나와 친밀한 관계를 원하시며, 이 말씀을 통해 그분의 뜻에 거하라고 하신다.)"
                    className="w-full mt-1 p-2 border rounded"
                    rows={3}
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-yellow-900 mb-1">2️⃣ HOW – 어떻게 살아야 하는가? (삶의 적용)</label>
                <textarea
                    name="how"
                    value={form.how}
                    onChange={handleChange}
                    placeholder="오늘 이 말씀에 따라 나는 어떤 태도를 가져야 하는가? (예: 말씀을 매일 묵상하고 기도로 주님과 연결된 삶을 살기.)"
                    className="w-full mt-1 p-2 border rounded"
                    rows={3}
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-yellow-900 mb-1">3️⃣ WHAT – 무엇을 할 것인가? (실천 행동)</label>
                <textarea
                    name="what"
                    value={form.what}
                    onChange={handleChange}
                    placeholder="오늘 이 말씀을 삶 속에서 실천하기 위해 무엇을 할 것인가? (예: 오늘 하루 휴대폰보다 말씀을 먼저 보겠습니다.)"
                    className="w-full mt-1 p-2 border rounded"
                    rows={3}
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-yellow-900 mb-1">🙏 골든 서클 기도문 작성</label>
                <textarea
                    name="prayer"
                    value={form.prayer}
                    onChange={handleChange}
                    placeholder={`(Why – 감사 / How – 회개 / What – 간구의 구조로 작성)\n\n하늘에 계신 아버지,\n\n(하나님의 마음에 대한 감사 표현)\n(말씀에 따라 살아가지 못한 모습에 대한 고백)\n(오늘 말씀에 순종하기 위한 간구)\n\n주 예수 그리스도의 이름으로 간절히 기도를 드립니다. 아멘.`}
                    className="w-full mt-1 p-2 border rounded"
                    rows={5}
                    required
                />
            </div>
            <div>
                <label className="block font-bold text-yellow-900 mb-1">💬 오늘의 묵상 요약 한 줄</label>
                <input
                    type="text"
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    placeholder="오늘 하루 기억하고 실천할 말씀 한 줄"
                    className="w-full mt-1 p-2 border rounded"
                    required
                />
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition"
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
