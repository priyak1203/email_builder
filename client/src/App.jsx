import { SidePanel, Template } from './components';

function App() {
  return (
    <main>
      <header className="header">
        <nav>
          <p>Email Template Builder</p>
        </nav>
      </header>
      <div>
        <section className="layout-container">
          <div className="layout-section">
            <Template />
          </div>
          <div className="layout-section">
            <SidePanel />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
