import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Plus, 
  Github, 
  FileText, 
  ExternalLink, 
  Users, 
  Search,
  Tag,
  Trash2,
  ChevronLeft,
  Settings,
  Save,
  RefreshCw,
  Quote,
  AlertCircle,
  LogOut,
  User,
  File,
  Loader,
  Box
} from 'lucide-react';

// --- Constants ---
const DEFAULT_FILENAME = 'cube-ai-library.json';
const STORAGE_KEY = 'cube_ai_config';

// --- Demo Data ---
const DEMO_PAPERS = [
  {
    id: 'demo-1',
    title: 'Agentic Systems in Radiology',
    arxivId: '2510.09404',
    type: 'arxiv',
    addedBy: 'Mostafa Ali',
    addedAt: new Date().toISOString(),
    tags: ['Phase 2', 'Agents'],
    comments: []
  }
];

// --- Components ---

const ConfigModal = ({ config, onSave, isVerifying, error }) => {
  const [formData, setFormData] = useState(config || { owner: '', repo: '', token: '', path: DEFAULT_FILENAME });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDemo = () => {
    onSave({ owner: 'cube-ai', repo: 'research-db', token: 'demo-mode', path: 'local-memory' });
  };

  return (
    <div className="fixed inset-0 bg-[#0d1117] flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] border border-[#30363d] mb-4 relative">
            <Box className="w-8 h-8 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">CUBE<span className="text-cyan-400">.AI</span> Research</h2>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded text-red-200 text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] mb-1 uppercase tracking-wider">Repository Owner</label>
              <input name="owner" value={formData.owner} onChange={handleChange} placeholder="e.g. cube-ai-team" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] mb-1 uppercase tracking-wider">Repository Name</label>
              <input name="repo" value={formData.repo} onChange={handleChange} placeholder="e.g. knowledge-base" className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] mb-1 uppercase tracking-wider">Personal Access Token</label>
              <input name="token" type="password" value={formData.token} onChange={handleChange} placeholder="ghp_..." className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] mb-1 uppercase tracking-wider">DB File Path</label>
              <input name="path" value={formData.path} onChange={handleChange} placeholder={DEFAULT_FILENAME} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" />
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => onSave(formData)} 
              disabled={isVerifying || !formData.token || !formData.repo}
              className="w-full py-2.5 bg-[#0969da] text-white rounded-md hover:bg-[#0a75f0] font-semibold text-sm transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Github className="w-4 h-4 mr-2" />}
              {isVerifying ? 'Verifying...' : 'Connect & Verify'}
            </button>
            <button onClick={handleDemo} className="w-full text-xs text-[#8b949e] hover:text-white underline">
              Try Team Demo Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddPaperModal = ({ onClose, onAdd, isSyncing }) => {
  const [mode, setMode] = useState('arxiv'); 
  const [title, setTitle] = useState('');
  const [id, setId] = useState(''); 
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSyncing) return;

    let paperData = {
      id: crypto.randomUUID(),
      title,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      addedAt: new Date().toISOString(),
      comments: [],
      type: mode 
    };

    if (mode === 'arxiv') {
      let cleanId = id.trim();
      const urlMatch = cleanId.match(/arxiv\.org\/(?:abs|pdf)\/([0-9.]+)(?:v\d+)?/);
      if (urlMatch) cleanId = urlMatch[1];
      paperData.arxivId = cleanId;
      paperData.sourcePath = null;
    } else {
      paperData.arxivId = 'LOCAL PDF';
      paperData.sourcePath = id.trim(); 
    }
    
    onAdd(paperData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg w-full max-w-md shadow-2xl animate-in zoom-in-95">
        <div className="px-4 py-3 border-b border-[#30363d] flex justify-between items-center bg-[#21262d] rounded-t-lg">
          <h3 className="text-white font-semibold">Add New Paper</h3>
          <button onClick={onClose} className="text-[#8b949e] hover:text-white">✕</button>
        </div>
        
        <div className="p-4 border-b border-[#30363d] flex gap-2">
           <button onClick={() => setMode('arxiv')} className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${mode === 'arxiv' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/50' : 'bg-[#0d1117] text-[#8b949e] border border-[#30363d]'}`}>ArXiv URL</button>
           <button onClick={() => setMode('repo')} className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors ${mode === 'repo' ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-500/50' : 'bg-[#0d1117] text-[#8b949e] border border-[#30363d]'}`}>PDF in Repo</button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-xs text-[#8b949e] font-semibold uppercase">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-sm text-white mt-1 focus:border-cyan-500 outline-none" placeholder="e.g. My Research Paper" required />
          </div>
          {mode === 'arxiv' ? (
            <div>
              <label className="text-xs text-[#8b949e] font-semibold uppercase">ArXiv ID</label>
              <input value={id} onChange={e => setId(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-sm text-white mt-1 focus:border-cyan-500 outline-none" placeholder="e.g. 1706.03762" required />
            </div>
          ) : (
             <div>
              <label className="text-xs text-[#8b949e] font-semibold uppercase">File Path in Repo</label>
              <input value={id} onChange={e => setId(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-sm text-white mt-1 focus:border-cyan-500 outline-none font-mono" placeholder="e.g. papers/my-new-paper.pdf" required />
              <p className="text-[10px] text-[#8b949e] mt-1">Must match exact path. Use <code>papers/file.pdf</code> for public files.</p>
            </div>
          )}
          <div>
            <label className="text-xs text-[#8b949e] font-semibold uppercase">Tags</label>
            <input value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-sm text-white mt-1 focus:border-cyan-500 outline-none" placeholder="Draft, Review" />
          </div>
          <button type="submit" disabled={isSyncing} className="w-full py-2 bg-[#0969da] text-white rounded hover:bg-[#0a75f0] text-sm font-medium flex justify-center items-center">
            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Add to Repository'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- UPDATED SECURE PDF VIEWER ---
const SecurePdfViewer = ({ config, paper }) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      setError(null);
      setLoading(true);

      // STRATEGY 1: Direct Link (Fastest - for Public folder)
      // If the path starts with "papers/", we assume it's in the public folder
      if (paper.sourcePath && paper.sourcePath.startsWith('papers/')) {
        // Handle spaces in filename by encoding them
        const encodedPath = paper.sourcePath.split('/').map(part => encodeURIComponent(part)).join('/');
        const directUrl = `./${paper.sourcePath}`; 
        
        // Check if file exists to avoid 404s showing blank frames
        try {
          const check = await fetch(directUrl, { method: 'HEAD' });
          if (check.ok) {
            setUrl(directUrl);
            setLoading(false);
            return; 
          } else {
             console.log("Direct load failed (404), trying API...");
          }
        } catch (e) {
          console.log("Direct load failed, trying API...", e);
        }
      }

      // STRATEGY 2: GitHub API (Fallback for Private/Root files)
      if (config.token === 'demo-mode') {
         setError("Demo Mode: Cannot load Repo PDF.");
         setLoading(false);
         return;
      }

      try {
        const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${paper.sourcePath}`;
        const res = await fetch(apiUrl, {
           headers: {
             'Authorization': `token ${config.token}`,
             'Accept': 'application/vnd.github.v3.raw' 
           }
        });

        if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
        
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPdf();
    
    // Cleanup blob URLs
    return () => { if (url && url.startsWith('blob:')) URL.revokeObjectURL(url); };
  }, [paper.id, config]);

  if (loading) return (
    <div className="flex items-center justify-center h-full flex-col text-[#8b949e]">
      <Loader className="w-8 h-8 animate-spin mb-4 text-cyan-400" />
      <p>Loading PDF...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-full flex-col text-red-400 p-8 text-center">
      <AlertCircle className="w-10 h-10 mb-4 opacity-50" />
      <p className="font-semibold">Could not load PDF</p>
      <p className="text-sm mt-2 opacity-80">{error}</p>
      <div className="text-xs mt-4 text-[#8b949e] border border-[#30363d] p-2 rounded bg-[#0d1117]">
         path: {paper.sourcePath}
      </div>
    </div>
  );

  return (
    <iframe 
      src={url} 
      className="flex-1 w-full h-full border-none bg-[#525659]"
      title="PDF Viewer" 
    />
  );
};

// --- Main Application ---

export default function GitHubPaperManager() {
  const [config, setConfig] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [papers, setPapers] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);
  
  const [view, setView] = useState('list'); 
  const [activePaper, setActivePaper] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  
  const [commentText, setCommentText] = useState('');
  const [pageRef, setPageRef] = useState('');
  const [quoteText, setQuoteText] = useState('');
  
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setConfig(parsed);
      verifyAndLoad(parsed);
    } else {
      setShowConfig(true);
    }
  }, []);

  const verifyAndLoad = async (cfg) => {
    setVerifying(true);
    setError(null);
    
    if (cfg.token === 'demo-mode') {
      setTimeout(() => {
        setCurrentUser({ login: 'Mostafa Ali', avatar_url: null });
        setPapers(DEMO_PAPERS);
        setConfig(cfg);
        setShowConfig(false);
        setVerifying(false);
      }, 800);
      return;
    }

    try {
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${cfg.token}` }
      });
      if (!userRes.ok) throw new Error('Invalid Token');
      const userData = await userRes.json();
      setCurrentUser(userData);

      const repoRes = await fetch(`https://api.github.com/repos/${cfg.owner}/${cfg.repo}`, {
        headers: { Authorization: `token ${cfg.token}` }
      });
      if (!repoRes.ok) throw new Error('Repo not found');
      
      await fetchPapers(cfg);
      setShowConfig(false);
    } catch (err) {
      setError(err.message);
      if (!showConfig) setShowConfig(true);
    } finally {
      setVerifying(false);
    }
  };

  const fetchPapers = async (currentConfig = config) => {
    if (currentConfig?.token === 'demo-mode') return;

    setLoading(true);
    try {
      const { owner, repo, path, token } = currentConfig;
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
        cache: 'no-store'
      });

      if (response.status === 404) {
        setPapers([]); 
      } else if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.statusText}`);
      } else {
        const data = await response.json();
        try {
            const content = JSON.parse(decodeURIComponent(escape(atob(data.content))));
            setPapers(content);
            if (activePaper) {
              const updatedActive = content.find(p => p.id === activePaper.id);
              if (updatedActive) setActivePaper(updatedActive);
            }
        } catch (e) {
            console.error("Error parsing JSON content", e);
            setPapers([]);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const performSmartSync = async (changeType, payload) => {
    setSyncing(true);
    
    if (config.token === 'demo-mode') {
      await new Promise(r => setTimeout(r, 600));
      let newPapers = [...papers];
      if (changeType === 'ADD_PAPER') newPapers = [payload, ...newPapers];
      if (changeType === 'DELETE_PAPER') newPapers = newPapers.filter(p => p.id !== payload.id);
      if (changeType === 'ADD_COMMENT') {
         newPapers = newPapers.map(p => p.id === payload.paperId ? {...p, comments: [...(p.comments||[]), payload.comment]} : p);
      }
      setPapers(newPapers);
      if(activePaper) setActivePaper(newPapers.find(p => p.id === activePaper.id));
      setSyncing(false);
      return true;
    }

    try {
      const { owner, repo, path, token } = config;
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      
      const getRes = await fetch(url, {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
        cache: 'no-store'
      });

      let currentSha = null;
      let remotePapers = [];

      if (getRes.ok) {
        const data = await getRes.json();
        currentSha = data.sha;
        try {
           remotePapers = JSON.parse(decodeURIComponent(escape(atob(data.content))));
        } catch(e) {
           remotePapers = [];
        }
      } else if (getRes.status !== 404) {
        throw new Error("Failed to fetch latest data");
      }

      let mergedPapers = [...remotePapers];
      if (changeType === 'ADD_PAPER') mergedPapers = [payload, ...mergedPapers];
      if (changeType === 'DELETE_PAPER') mergedPapers = mergedPapers.filter(p => p.id !== payload.id);
      if (changeType === 'ADD_COMMENT') {
        mergedPapers = mergedPapers.map(p => {
          if (p.id === payload.paperId) return { ...p, comments: [...(p.comments || []), payload.comment] };
          return p;
        });
      }

      const putBody = {
        message: `CUBE.AI: ${changeType} by ${currentUser.login}`,
        content: btoa(unescape(encodeURIComponent(JSON.stringify(mergedPapers, null, 2)))),
        sha: currentSha
      };

      const putRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(putBody)
      });

      if (!putRes.ok) throw new Error("Failed to push changes");

      setPapers(mergedPapers);
      if (activePaper) setActivePaper(mergedPapers.find(p => p.id === activePaper.id));
      return true;

    } catch (err) {
      alert(`Sync Failed: ${err.message}`);
      return false;
    } finally {
      setSyncing(false);
    }
  };

  const handleConfigSave = (newConfig) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    setConfig(newConfig);
    verifyAndLoad(newConfig);
  };

  const handleDisconnect = () => {
    if (confirm("Disconnect?")) {
      localStorage.removeItem(STORAGE_KEY);
      setConfig(null);
      setPapers([]);
      setShowConfig(true);
    }
  };

  const handleAddPaper = async (paper) => {
    const success = await performSmartSync('ADD_PAPER', { ...paper, addedBy: currentUser.login });
    if (success) setShowAdd(false);
  };

  const handleDeletePaper = async (e, paperId) => {
    e.stopPropagation();
    if (!confirm("Delete this paper?")) return;
    const success = await performSmartSync('DELETE_PAPER', { id: paperId });
    if (success && activePaper?.id === paperId) setView('list');
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: crypto.randomUUID(),
      text: commentText,
      page: pageRef || null,
      quote: quoteText || null,
      user: currentUser.login,
      avatar: currentUser.avatar_url,
      timestamp: new Date().toISOString()
    };

    const success = await performSmartSync('ADD_COMMENT', { paperId: activePaper.id, comment: newComment });
    if (success) {
      setCommentText('');
      setPageRef('');
      setQuoteText('');
    }
  };

  if (!config && !showConfig) return (
     <div className="flex h-screen w-full items-center justify-center bg-[#0d1117] text-[#c9d1d9]">
        <button onClick={() => setShowConfig(true)} className="px-4 py-2 bg-[#0969da] text-white rounded">Setup Configuration</button>
     </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#161b22] border-b border-[#30363d] shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-[#161b22] border border-[#30363d] flex items-center justify-center">
            <Box className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="font-bold text-lg text-white block leading-none">CUBE<span className="text-cyan-400">.AI</span></span>
            <span className="text-[10px] text-[#8b949e] font-mono mt-0.5 block">{config ? `${config.owner}/${config.repo}` : 'Not Connected'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {currentUser && (
            <div className="hidden md:flex items-center mr-2 px-3 py-1 bg-[#21262d] rounded-full border border-[#30363d]">
               {currentUser.avatar_url ? <img src={currentUser.avatar_url} className="w-4 h-4 rounded-full mr-2" alt="" /> : <User className="w-3 h-3 mr-2 text-cyan-400" />}
               <span className="text-xs font-semibold text-white">{currentUser.login}</span>
            </div>
          )}
          <button onClick={() => fetchPapers()} className={`p-2 hover:bg-[#21262d] rounded-md ${loading ? 'animate-spin' : ''}`}><RefreshCw className="w-4 h-4" /></button>
          <button onClick={handleDisconnect} className="p-2 hover:bg-[#21262d] rounded-md hover:text-red-400"><LogOut className="w-4 h-4" /></button>
          <button onClick={() => setShowAdd(true)} disabled={!config} className="flex items-center px-3 py-1.5 text-sm bg-[#0969da] hover:bg-[#0a75f0] text-white rounded-md font-medium shadow-lg shadow-blue-900/20"><Plus className="w-4 h-4 mr-1.5" /> Add Paper</button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-hidden relative">
        {(loading || syncing) && (
          <div className="absolute top-0 left-0 w-full h-0.5 z-50 bg-cyan-900/50"><div className="h-full bg-cyan-500 w-full animate-progress-indeterminate origin-left" /></div>
        )}

        {view === 'list' ? (
          <div className="h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#30363d]">
            <div className="max-w-5xl mx-auto space-y-4">
              {papers.length === 0 && !loading && (
                  <div className="text-center py-20 text-[#8b949e]">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No papers found. Add one to get started!</p>
                  </div>
              )}
              {papers.map(paper => (
                <div key={paper.id} onClick={() => { setActivePaper(paper); setView('reader'); }} className="group bg-[#161b22] border border-[#30363d] rounded-lg p-5 hover:border-cyan-500/50 cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-900/10">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {paper.type === 'repo' ? (
                           <span className="text-amber-400/80 font-mono text-[10px] bg-amber-900/10 px-1.5 py-0.5 rounded border border-amber-800/30 flex items-center">
                              <File className="w-3 h-3 mr-1" /> PDF
                           </span>
                        ) : (
                           <span className="text-[#8b949e] font-mono text-[10px] bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d]">
                             {paper.arxivId}
                           </span>
                        )}
                        {paper.tags?.map(tag => <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-900/20 text-cyan-400 border border-cyan-800/30">{tag}</span>)}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{paper.title}</h3>
                      <div className="flex items-center mt-3 text-xs text-[#8b949e]">
                          <span>Added by {paper.addedBy || 'Unknown'}</span>
                          <span className="mx-3">•</span>
                          <MessageSquare className="w-3 h-3 mr-1" /> {paper.comments?.length || 0} notes
                      </div>
                    </div>
                    <button onClick={(e) => handleDeletePaper(e, paper.id)} className="p-2 text-[#484f58] hover:text-red-400 hover:bg-[#21262d] rounded opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col md:flex-row">
            <div className="flex-1 flex flex-col border-r border-[#30363d] bg-white relative">
              <div className="h-10 bg-[#f6f8fa] border-b border-[#d0d7de] flex items-center justify-between px-4 shrink-0">
                <button onClick={() => setView('list')} className="text-xs flex items-center text-[#0969da] hover:underline font-semibold"><ChevronLeft className="w-4 h-4 mr-1" /> Back</button>
                {activePaper.type === 'repo' && (
                  <span className="text-xs font-mono text-[#57606a]">{activePaper.sourcePath}</span>
                )}
                {activePaper.type === 'arxiv' && (
                    <a href={`https://arxiv.org/abs/${activePaper.arxivId}`} target="_blank" rel="noreferrer" className="text-xs flex items-center text-[#57606a] hover:text-[#0969da]"><ExternalLink className="w-3 h-3 mr-1"/> ArXiv</a>
                )}
              </div>
              
              {activePaper.type === 'repo' ? (
                <SecurePdfViewer config={config} paper={activePaper} />
              ) : (
                <iframe src={`https://www.arxiv-vanity.com/papers/${activePaper.arxivId}/`} className="flex-1 w-full h-full border-none bg-white" title="Paper Reader" />
              )}
            </div>

            <div className="w-full md:w-[400px] bg-[#0d1117] flex flex-col border-t md:border-t-0 border-[#30363d]">
              <div className="p-4 border-b border-[#30363d] bg-[#161b22]">
                <h2 className="text-sm font-bold text-white leading-snug">{activePaper.title}</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#30363d]">
                {activePaper.comments?.map((comment) => (
                   <div key={comment.id} className="animate-in slide-in-from-right-2">
                     <div className="flex items-center space-x-2 mb-1">
                       <span className="text-xs font-semibold text-cyan-400">{comment.user}</span>
                     </div>
                     <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden p-3 text-sm text-[#c9d1d9] whitespace-pre-wrap">
                       {comment.quote && <div className="mb-2 pl-2 border-l-2 border-cyan-500 text-[#8b949e] italic text-xs">"{comment.quote}"</div>}
                       {comment.text}
                     </div>
                   </div>
                ))}
              </div>
              <div className="p-4 bg-[#161b22] border-t border-[#30363d] space-y-3">
                  <div className="flex space-x-2">
                    <input value={quoteText} onChange={(e) => setQuoteText(e.target.value)} placeholder="Quote..." className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md text-xs py-1.5 px-3 text-white focus:border-cyan-500 outline-none" />
                    <input value={pageRef} onChange={(e) => setPageRef(e.target.value)} placeholder="Pg" className="w-12 bg-[#0d1117] border border-[#30363d] rounded-md text-xs py-1.5 px-1 text-white text-center focus:border-cyan-500 outline-none" />
                  </div>
                  <div className="relative">
                    <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a note..." className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-sm text-white h-20 resize-none focus:border-cyan-500 outline-none" />
                    <button onClick={handleAddComment} disabled={!commentText.trim() || syncing} className="absolute bottom-2 right-2 p-1.5 bg-[#0969da] text-white rounded-md hover:bg-[#0a75f0] disabled:opacity-50"><Save className="w-4 h-4" /></button>
                  </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {showConfig && <ConfigModal config={config} onSave={handleConfigSave} isVerifying={verifying} error={error} />}
      {showAdd && <AddPaperModal onClose={() => setShowAdd(false)} onAdd={handleAddPaper} isSyncing={syncing} />}
    </div>
  );
}