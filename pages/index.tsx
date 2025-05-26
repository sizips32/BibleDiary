import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import GoldenCircleForm from '../components/GoldenCircleForm'
import DiaryList, { DiaryItem } from '../components/DiaryList'
import SummaryCard from '../components/SummaryCard'

const STORAGE_KEY = 'bible-diary-list-v1'

function loadDiaries(): DiaryItem[] {
    if (typeof window === 'undefined') return []
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

function saveDiaries(diaries: DiaryItem[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diaries))
}

export default function Home() {
    const [diaries, setDiaries] = useState<DiaryItem[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [editId, setEditId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        setDiaries(loadDiaries())
    }, [])

    useEffect(() => {
        saveDiaries(diaries)
    }, [diaries])

    const handleAdd = () => {
        setEditId(null)
        setShowForm(true)
        setSelectedId(null)
    }

    const handleEdit = (id: string) => {
        setEditId(id)
        setShowForm(true)
        setSelectedId(null)
    }

    const handleDelete = (id: string) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setDiaries(diaries.filter(d => d.id !== id))
            if (selectedId === id) setSelectedId(null)
            if (editId === id) setEditId(null)
        }
    }

    const handleSave = (item: DiaryItem) => {
        if (editId) {
            setDiaries(diaries.map(d => d.id === item.id ? item : d))
        } else {
            setDiaries([{ ...item }, ...diaries])
        }
        setShowForm(false)
        setEditId(null)
        setSelectedId(item.id)
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditId(null)
    }

    const handleSelect = (id: string) => {
        setSelectedId(id)
        setShowForm(false)
        setEditId(null)
    }

    const selectedDiary = diaries.find(d => d.id === selectedId)
    const editDiary = diaries.find(d => d.id === editId)

    return (
        <>
            <Head>
                <title>승리복음 매일 묵상 플래너</title>
                <meta name="description" content="골든 서클 방식으로 매일 말씀을 묵상하고 기록하세요." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main>
                <div className="max-w-2xl mx-auto mt-8 flex justify-end">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded shadow"
                        onClick={handleAdd}
                    >
                        + 새 묵상 기록 추가
                    </button>
                </div>
                {showForm ? (
                    <GoldenCircleForm
                        initialForm={editDiary || null}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isEditMode={!!editId}
                    />
                ) : selectedDiary ? (
                    <SummaryCard form={selectedDiary} onEdit={() => handleEdit(selectedDiary.id)} />
                ) : null}
                <DiaryList
                    diaries={diaries}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <footer className="text-center text-yellow-700 mt-12 mb-4">
                    © {new Date().getFullYear()} 승리복음 매일 묵상 플래너
                </footer>
            </main>
        </>
    )
}
