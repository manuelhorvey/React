'use client';
import React, { useState } from 'react';
import AgentCard from './AgentCard';
import AgentModal from './AgentModal';

interface Agent {
  name: string;
  location: string;
  commissionRate: string;
  WinscommissionRate:string;
}

const AgentForm: React.FC<{ onAdd: (agent: Agent) => void }> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [commissionRate, setCommissionRate] = useState('');
  const [WinscommissionRate, setWinsCommissionRate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, location, commissionRate, WinscommissionRate });
    setName('');
    setLocation('');
    setCommissionRate('');
    setWinsCommissionRate('');
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="w-full p-2 border border-gray-300 rounded" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required className="w-full p-2 border border-gray-300 rounded" />
      <input value={commissionRate} onChange={e => setCommissionRate(e.target.value)} placeholder="Gross Commission Rate" required className="w-full p-2 border border-gray-300 rounded" />
      <input value={WinscommissionRate} onChange={e => setWinsCommissionRate(e.target.value)} placeholder="Wins Commission Rate" required className="w-full p-2 border border-gray-300 rounded" />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Agent</button>
    </form>
  );
};

const Accounts: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleAdd = (agent: Agent) => {
    setAgents([agent, ...agents]);
    setIsAdding(false);
  };

  const handleRemove = (index: number) => {
    setAgents(agents.filter((_, i) => i !== index));
  };

  const handleCardClick = (index: number) => {
    setSelectedAgent(agents[index]); // Set the selected agent for the modal
  };

  const closeModal = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="space-y-4">
      {isAdding ? (
        <AgentForm onAdd={handleAdd} />
      ) : (
        <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add New Agent
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <AgentCard
            key={index}
            agent={agent}
            onClick={() => handleCardClick(index)} 
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
      {selectedAgent && <AgentModal agent={selectedAgent} closeModal={closeModal} />}
    </div>
  );
};

  

export default Accounts;