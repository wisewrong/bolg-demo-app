import React from 'react';
import classnames from 'classnames';

export default function Toolbar() {
  // 保存
  const handleSave = () => {};

  // 重置节点
  const handleRest = () => {};

  return (
    <div className="toolbar">
      <button
        className={classnames(["button"])}
        onClick={handleRest}
      >
        重置
      </button>
      <button
        className={classnames(["button", "primary-btn"])}
        onClick={handleSave}
      >
        保存
      </button>
    </div>
  );
}
