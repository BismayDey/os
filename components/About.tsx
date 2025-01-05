export default function About() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">About SimpleOS</h2>
      <p>SimpleOS is a basic OS-like interface built with Next.js and React.</p>
      <p>Version: 1.1.0</p>
      <ul className="list-disc list-inside mt-2">
        <li>Responsive design</li>
        <li>Multiple applications</li>
        <li>Draggable windows</li>
        <li>Start menu and taskbar</li>
      </ul>
    </div>
  );
}
