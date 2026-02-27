import React, { useEffect, useState } from "react";
import { 
  FileText, Shield, Globe, Calendar, Star, 
  Download, Activity, AlertTriangle, ChevronRight, 
  Image as ImageIcon, ExternalLink, Info, Lock 
} from "lucide-react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ipDetailMock from "../mocks/ipDetailMock";

const IPDetailPage = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(ipDetailMock);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#060B18] flex items-center justify-center text-blue-500 font-mono">
      FETCHING GLOBAL DOSSIER...
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto space-y-6 pb-12 text-slate-300 p-4">
        
        {/* HERO SECTION */}
        <header className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Shield size={150} /></div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">{data.status}</span>
                <span className="text-slate-500 text-sm font-mono">ID: {data.publicationNumber}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-white leading-tight max-w-4xl tracking-tight">{data.title}</h1>
              <p className="text-blue-400 font-semibold">Assignee: {data.assignee.name}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setBookmarked(!bookmarked)} className="p-3 bg-slate-800 border border-slate-700 rounded-xl hover:border-slate-500 transition-all">
                <Star size={20} className={bookmarked ? "fill-amber-400 text-amber-400" : "text-slate-400"} />
              </button>
              <button className="flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">
                <Download size={18} /> Export Data
              </button>
            </div>
          </div>
        </header>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <MetricCard label="Citations" value={data.intelligence.forwardCitations} sub="Forward Links" color="text-blue-400" />
          <MetricCard label="Family" value={data.intelligence.familySize} sub="Jurisdictions" color="text-purple-400" />
          <MetricCard label="Term" value={`${data.intelligence.remainingTermYears}y`} sub="Remaining" color="text-emerald-400" />
          <MetricCard label="Risk" value={data.intelligence.riskLevel} sub="Litigation" color="text-amber-400" />
          <MetricCard label="Relevance" value="94%" sub="Match Score" color="text-pink-400" />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* MAIN CONTENT AREA */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <nav className="flex bg-slate-900/50 border-b border-slate-800 px-4">
                {["overview", "claims", "technical drawings", "legal timeline"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-blue-500" : "text-slate-500 hover:text-slate-200"}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" />}
                  </button>
                ))}
              </nav>

              <div className="p-8 min-h-[400px]">
                {activeTab === "overview" && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2">
                    <section>
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2"><div className="w-1 h-5 bg-blue-500" /> Abstract</h3>
                      <p className="text-slate-400 leading-relaxed text-lg italic p-6 bg-slate-800/20 rounded-2xl border border-slate-800/50">"{data.abstract}"</p>
                    </section>
                    <section className="grid grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Classifications</h4>
                          <div className="flex flex-wrap gap-2">{data.classifications.ipc.map(c => <span key={c} className="bg-slate-950 px-3 py-1.5 rounded-lg text-xs font-mono text-blue-400 border border-slate-800">{c}</span>)}</div>
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Inventors</h4>
                          <div className="flex flex-wrap gap-2">{data.inventors.map(inv => <span key={inv} className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300 border border-slate-700">{inv}</span>)}</div>
                       </div>
                    </section>
                  </div>
                )}

                {activeTab === "technical drawings" && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.images.map((img) => (
                        <div key={img.id} className="group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all">
                          <div className="aspect-video bg-white flex items-center justify-center p-4">
                            <img src={img.url} alt={img.title} className="max-h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100" />
                          </div>
                          <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{img.title}</span>
                            <ExternalLink size={14} className="text-slate-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "claims" && (
                  <div className="space-y-4">
                    {data.claims.map((claim, i) => (
                      <div key={i} className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all">
                        <p className="text-slate-300 text-sm leading-relaxed"><span className="text-blue-500 font-black mr-4 text-xs italic">CLAIM_{i+1}</span> {claim}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "legal timeline" && (
                  <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {data.legalTimeline.map((event, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 z-10" />
                        <div className="flex justify-between items-center bg-slate-800/40 p-4 rounded-xl border border-slate-800 shadow-sm">
                          <span className="text-white font-bold text-sm">{event.event}</span>
                          <span className="text-slate-500 font-mono text-xs">{event.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold mb-4 flex items-center justify-between text-sm">Official Document Vault <Lock size={14} /></h3>
              <div className="space-y-3">
                <FileItem title="Original Specification" size="2.4 MB" ext="PDF" />
                <FileItem title="Office Action Response" size="1.1 MB" ext="DOCX" />
                <FileItem title="Certified Grant Copy" size="4.8 MB" ext="PDF" highlight />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
               <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><Shield size={14}/> Strategic Intelligence</h3>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">High technical overlap with 5G portfolios. Recommended for White-Space Analysis before market entry.</p>
               <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-2"><div className="h-full bg-blue-500 w-[78%]" /></div>
               <div className="flex justify-between text-[10px] font-bold text-slate-500"><span>STRENGTH RATIO</span><span>78/100</span></div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};

const MetricCard = ({ label, value, sub, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg border-b-4 border-b-slate-800 hover:border-b-blue-500 transition-all">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
    <p className="text-[9px] text-slate-600 mt-1 font-bold italic">{sub}</p>
  </div>
);

const FileItem = ({ title, size, ext, highlight }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${highlight ? 'bg-blue-600/10 border-blue-500/30' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-black ${highlight ? 'bg-blue-50 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>{ext}</div>
      <div>
        <p className={`text-[11px] font-bold ${highlight ? 'text-blue-400' : 'text-slate-300'}`}>{title}</p>
        <p className="text-[9px] text-slate-600">{size}</p>
      </div>
    </div>
    <Download size={14} className="text-slate-600" />
  </div>
);

export default IPDetailPage;