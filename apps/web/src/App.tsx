import { useState } from 'react'
import { Activity, RefreshCw, ShieldCheck } from 'lucide-react'

type Status = 'Not checked' | 'Checking' | 'Connected' | 'Unavailable'

export default function App() {
  const [status, setStatus] = useState<Status>('Not checked')

  async function checkConnection() {
    setStatus('Checking')
    try {
      const response = await fetch('/actuator/health', { signal: AbortSignal.timeout(5000) })
      const body = await response.json()
      setStatus(response.ok && body.status === 'UP' ? 'Connected' : 'Unavailable')
    } catch {
      setStatus('Unavailable')
    }
  }

  return (
    <div className="workspace">
      <aside>
        <div className="brand"><ShieldCheck aria-hidden="true" size={26} /><strong>RuleHarbor</strong></div>
        <div className="section-label"><Activity aria-hidden="true" size={18} /> Workspace</div>
        <span className="environment">Local development</span>
      </aside>
      <main>
        <header><h1>Workspace</h1><span className="stage">Initial scaffold</span></header>
        <section aria-labelledby="connection-heading">
          <h2 id="connection-heading">API connection</h2>
          <div className="connection">
            <span role="status" className={`status status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
            <button onClick={checkConnection} disabled={status === 'Checking'}>
              <RefreshCw aria-hidden="true" size={16} /> Check connection
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
