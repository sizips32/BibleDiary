import React from 'react'

interface MainMenuProps {
    onAdd: () => void
    onList: () => void
    onEgw: () => void
}

export default function MainMenu({ onAdd, onList, onEgw }: MainMenuProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="flex flex-row gap-4 w-full max-w-2xl mx-auto mb-6">
                <button
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl shadow text-lg"
                    onClick={onAdd}
                >
                    말씀 묵상 기도
                </button>
                <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl shadow text-lg"
                    onClick={onEgw}
                >
                    영감의 글 묵상
                </button>
                <button
                    className="flex-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-bold py-3 px-6 rounded-xl shadow text-lg"
                    onClick={onList}
                >
                    묵상 기도 목록 보기
                </button>
            </div>
            <img
                src="/handprayer.png"
                alt="기도하는 이미지"
                className="w-full max-w-xs h-40 object-contain mb-4 drop-shadow-lg mx-auto"
            />
            <div className="text-xl md:text-2xl font-bold text-yellow-800 text-center mt-2">
                “주의 말씀은 내 발에 등이요 내 길에 빛이니이다”<br />
                <span className="text-base font-normal text-gray-500">(시편 119:105)</span>
            </div>
        </div>
    )
} 
