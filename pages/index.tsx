import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import GoldenCircleForm from '../components/GoldenCircleForm'
import DiaryList, { DiaryItem } from '../components/DiaryList'
import SummaryCard from '../components/SummaryCard'
import MainMenu from '../components/MainMenu'
import EgwForm from '../components/EgwForm'
import EgwCard from '../components/EgwCard'

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
    const [view, setView] = useState<'menu' | 'add' | 'list' | 'egw' | 'edit-egw' | 'egw-summary'>('menu')
    const [editType, setEditType] = useState<'bible' | 'egw' | null>(null)

    useEffect(() => {
        setDiaries(loadDiaries())
    }, [])

    useEffect(() => {
        saveDiaries(diaries)
    }, [diaries])

    const handleAdd = () => {
        setEditId(null)
        setView('add')
        setSelectedId(null)
    }

    const handleEdit = (id: string) => {
        const diary = diaries.find(d => d.id === id)
        if (!diary) return
        setEditId(id)
        if (diary.type === 'egw') {
            setEditType('egw')
            setView('egw')
        } else {
            setEditType('bible')
            setView('add')
        }
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
        if (item.type === 'egw') {
            setDiaries(prev => {
                const exists = prev.some(d => d.id === item.id)
                const newDiaries = exists
                    ? prev.map(d => d.id === item.id ? item : d)
                    : [item, ...prev]
                setSelectedId(item.id)
                setView('egw-summary')
                return newDiaries
            })
        } else {
            if (editId) {
                setDiaries(diaries.map(d => d.id === item.id ? item : d))
            } else {
                setDiaries([{ ...item }, ...diaries])
            }
            setView('list')
            setSelectedId(item.id)
        }
        setEditId(null)
    }

    const handleCancel = () => {
        setView('menu')
        setEditId(null)
    }

    const handleSelect = (id: string) => {
        setSelectedId(id)
        setEditId(null)
    }

    const handleAddEgw = () => {
        setEditId(null)
        setEditType('egw')
        setView('egw')
        setSelectedId(null)
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
                {view === 'menu' && (
                    <MainMenu
                        onAdd={handleAdd}
                        onList={() => setView('list')}
                        onEgw={handleAddEgw}
                    />
                )}
                {view === 'add' && (
                    <GoldenCircleForm
                        initialForm={editDiary || null}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isEditMode={!!editId}
                    />
                )}
                {view === 'list' && (
                    <>
                        <div className="max-w-2xl mx-auto mt-8 flex justify-end">
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded shadow"
                                onClick={() => setView('menu')}
                            >
                                ← 메인 메뉴로
                            </button>
                        </div>
                        {selectedDiary ? (
                            <SummaryCard form={selectedDiary} onEdit={() => handleEdit(selectedDiary.id)} />
                        ) : null}
                        <DiaryList
                            diaries={diaries}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </>
                )}
                {view === 'egw' && editType === 'egw' && (
                    <EgwForm
                        initialForm={editDiary || null}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isEditMode={!!editId}
                    />
                )}
                {view === 'egw-summary' && selectedDiary && (
                    <EgwCard form={selectedDiary} onEdit={() => handleEdit(selectedDiary.id)} />
                )}
                <footer className="text-center text-yellow-700 mt-12 mb-4">
                    © {new Date().getFullYear()} 승리복음 매일 묵상 플래너
                </footer>
            </main>
        </>
    )
}
