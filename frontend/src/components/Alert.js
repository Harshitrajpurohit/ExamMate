"use client"
import React from 'react'

export default function Alert({ message }) {
    return (
        <div className="text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-2 my-3 rounded relative" role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    )
}
