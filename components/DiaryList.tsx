import React from 'react'

export type DiaryType = 'bible' | 'egw'

export interface DiaryItem {
    id: string
    type: DiaryType
    date: string
    scripture?: string
    keyVerse?: string
    why?: string
    how?: string
    what?: string
    prayer?: string
    summary?: string
    youtubeTitle?: string
    youtubeUrl?: string
    // egw용 필드
    bookTitle?: string
    author?: string
    pageRange?: string
    excerpt?: string
    egwKey?: string
    reflection?: string
    egwPrayer?: string
    tags?: string
}

interface DiaryListProps {
    diaries: DiaryItem[]
    onEdit: (id: string) => void
    onDelete: (id: string) => void
}

function getTypeLabel(type: DiaryType) {
    return type === 'egw' ? '영감의 글 묵상' : '말씀 묵상'
}

export default function DiaryList({ diaries, onEdit, onDelete }: DiaryListProps) {
    if (diaries.length === 0) {
        return (
            <div className="max-w-2xl mx-auto mt-8 text-center text-gray-400">
                저장된 묵상 기록이 없습니다.
            </div>
        )
    }
    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-xl font-bold text-yellow-700 mb-4">📚 묵상 기도 목록</h2>
            <ul className="space-y-4">
                {diaries.map((item) => (
                    <li key={item.id} className="bg-white/80 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                            <div className="font-semibold text-yellow-800 flex items-center gap-2">
                                <span className={item.type === 'egw' ? 'bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs' : 'bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs'}>
                                    {getTypeLabel(item.type)}
                                </span>
                                {item.date} {item.scripture && `| ${item.scripture}`}
                                {item.bookTitle && `| ${item.bookTitle}`}
                            </div>
                            <div className="text-sm text-gray-600">{item.summary || item.egwKey}</div>
                            {item.youtubeTitle && item.youtubeUrl && (
                                <div className="text-xs mt-1">
                                    <span className="text-blue-700">🎬
                                        <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="underline ml-1">
                                            {item.youtubeTitle}
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                            <button
                                className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold py-1 px-3 rounded"
                                onClick={() => onEdit(item.id)}
                            >수정</button>
                            <button
                                className="bg-red-200 hover:bg-red-400 text-red-700 font-bold py-1 px-3 rounded"
                                onClick={() => onDelete(item.id)}
                            >삭제</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
} 
