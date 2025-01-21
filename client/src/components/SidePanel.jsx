import { useAppContext } from '../context';

function SidePanel() {
  const { isEditing, setEditing } = useAppContext();

  return (
    <div className="side-panel">
      <button className="btn-primary" onClick={setEditing} disabled={isEditing}>
        edit
      </button>

      <button className="btn-primary">download</button>
    </div>
  );
}

export default SidePanel;
