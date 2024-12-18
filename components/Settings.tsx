import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SettingsProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Settings({ theme, toggleTheme }: SettingsProps) {
  return (
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="flex items-center space-x-2">
        <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        <Label htmlFor="dark-mode">Dark Mode</Label>
      </div>
    </div>
  )
}

