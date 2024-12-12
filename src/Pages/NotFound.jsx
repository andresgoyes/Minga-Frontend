import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <main className="h-screen flex bg-white justify-center items-center">
        <div className="text-center">
          <p className="text-[48px] font-semibold text-indigo-600">SORRY, 404</p>
          {/* Imagen de manga */}
          <img
            src="https://stickershop.line-scdn.net/stickershop/v1/product/11419726/LINEStorePC/main.png?v=1" 
            alt="Manga Image"
            className="mx-auto mb-6"
            style={{ maxWidth: '300px' }}
          />

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">

          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            PAGE NOT FOUND
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to={`/home`}>
              <h1 className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                HOME
              </h1>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}