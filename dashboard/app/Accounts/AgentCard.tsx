import React from 'react';

interface Agent {
  name: string;
  location: string;
  commissionRate: string;
  WinscommissionRate: string;
}

interface AgentCardProps {
  agent: Agent;
  onRemove: () => void;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onRemove, onClick }) => (
  <div onClick={onClick} className="p-4 border border-gray-300 rounded max-w-xs max-h-60 overflow-auto">
    <button onClick={onRemove} className="m-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">X</button>
    <h2 className="text-xl font-bold">{agent.name}</h2>
    <p>{agent.location} | {agent.commissionRate},{agent.WinscommissionRate}</p>
    <div className="card-actions justify-end">
      <button className="bg-green-700  text-white rounded">Statements</button>
    </div>
  </div>
);

export default AgentCard;
