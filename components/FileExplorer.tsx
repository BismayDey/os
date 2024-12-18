'use client'

import { useState } from 'react'
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'

interface FileSystemItem {
  name: string
  type: 'file' | 'folder'
  children?: FileSystemItem[]
}

const initialFileSystem: FileSystemItem[] = [
  {
    name: 'Documents',
    type: 'folder',
    children: [
      { name: 'Resume.pdf', type: 'file' },
      { name: 'Project Proposal.docx', type: 'file' },
    ],
  },
  {
    name: 'Pictures',
    type: 'folder',
    children: [
      { name: 'Vacation.jpg', type: 'file' },
      { name: 'Family.png', type: 'file' },
    ],
  },
  { name: 'Notes.txt', type: 'file' },
]

function FileSystemItem({ item, depth = 0, theme }: { item: FileSystemItem; depth?: number; theme: 'light' | 'dark' }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div>
      <div
        className={`flex items-center p-1 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}
        style={{ paddingLeft: `${depth * 20}px` }}
        onClick={toggleOpen}
      >
        {item.type === 'folder' && (
          isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        )}
        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 mr-2 text-yellow-500" />
        ) : (
          <File className="w-4 h-4 mr-2 text-gray-500" />
        )}
        <span>{item.name}</span>
      </div>
      {item.type === 'folder' && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileSystemItem key={index} item={child} depth={depth + 1} theme={theme} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FileExplorer({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div className={`h-full overflow-auto ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-lg font-semibold mb-2">File Explorer</h2>
      {initialFileSystem.map((item, index) => (
        <FileSystemItem key={index} item={item} theme={theme} />
      ))}
    </div>
  )
}

