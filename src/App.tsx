import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { NewPageModal } from './components/common/NewPageModal';

// Pages
import { Dashboard } from './pages/admin/Dashboard';
import { PageList } from './pages/admin/PageList';
import { PageEditor } from './pages/admin/PageEditor';
import { WorkflowApprovals } from './pages/admin/WorkflowApprovals';
import { AnalyticsView } from './pages/admin/AnalyticsView';
import { TemplatesView } from './pages/admin/TemplatesView';
import { UsersView } from './pages/admin/UsersView';
import { SeoAuditView } from './pages/admin/SeoAuditView';
import { VercelDeployView } from './pages/admin/VercelDeployView';
import { MySubmissions } from './pages/user/MySubmissions';
import { LivePage } from './pages/public/LivePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [viewParams, setViewParams] = useState<any>({});
  const [newPageModalOpen, setNewPageModalOpen] = useState(false);

  const navigate = (view: string, params: any = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If not signed in and trying to access internal views, show login
  if (!currentUser && currentView !== 'login' && currentView !== 'signup' && currentView !== 'public-site' && currentView !== 'live-page') {
    return (
      <LoginPage
        onSuccess={() => navigate('dashboard')}
        onGoToSignup={() => navigate('signup')}
        onGoToPublic={() => navigate('public-site')}
      />
    );
  }

  // Auth pages
  if (currentView === 'login') {
    return (
      <LoginPage
        onSuccess={() => navigate('dashboard')}
        onGoToSignup={() => navigate('signup')}
        onGoToPublic={() => navigate('public-site')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupPage
        onSuccess={() => navigate('dashboard')}
        onGoToLogin={() => navigate('login')}
      />
    );
  }

  // Public Live Website Views
  if (currentView === 'public-site') {
    return (
      <LivePage
        slug="home"
        onNavigatePage={(slug) => navigate('live-page', { slug })}
        onReturnToAdmin={() => navigate('dashboard')}
      />
    );
  }

  if (currentView === 'live-page') {
    return (
      <LivePage
        slug={viewParams.slug || 'home'}
        onNavigatePage={(slug) => navigate('live-page', { slug })}
        onReturnToAdmin={() => navigate('dashboard')}
      />
    );
  }

  // Builder View (full-screen workspace with dedicated toolbars)
  if (currentView === 'builder') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar
          currentView={currentView}
          onNavigate={navigate}
          onOpenNewPageModal={() => setNewPageModalOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <PageEditor
            pageId={viewParams.pageId}
            onNavigate={navigate}
          />
        </main>
        <NewPageModal
          isOpen={newPageModalOpen}
          onClose={() => setNewPageModalOpen(false)}
          onPageCreated={(pageId) => {
            setNewPageModalOpen(false);
            navigate('builder', { pageId });
          }}
        />
      </div>
    );
  }

  // Standard Admin / Editor Portal with Sidebar and Main Layout
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        currentView={currentView}
        onNavigate={navigate}
        onOpenNewPageModal={() => setNewPageModalOpen(true)}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={navigate}
          onOpenNewPageModal={() => setNewPageModalOpen(true)}
        />

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {currentView === 'dashboard' && (
            <Dashboard
              onNavigate={navigate}
              onOpenNewPageModal={() => setNewPageModalOpen(true)}
            />
          )}

          {currentView === 'pages' && (
            <PageList
              onNavigate={navigate}
              onOpenNewPageModal={() => setNewPageModalOpen(true)}
            />
          )}

          {currentView === 'approvals' && (
            <WorkflowApprovals onNavigate={navigate} />
          )}

          {currentView === 'user-workspace' && (
            <MySubmissions
              onNavigate={navigate}
              onOpenNewPageModal={() => setNewPageModalOpen(true)}
            />
          )}

          {currentView === 'templates' && (
            <TemplatesView onNavigate={navigate} />
          )}

          {currentView === 'seo' && (
            <SeoAuditView onNavigate={navigate} />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView onNavigate={navigate} />
          )}

          {currentView === 'users' && (
            <UsersView />
          )}

          {currentView === 'deploy' && (
            <VercelDeployView />
          )}
        </main>
      </div>

      {/* Global New Page Creation Modal */}
      <NewPageModal
        isOpen={newPageModalOpen}
        onClose={() => setNewPageModalOpen(false)}
        onPageCreated={(pageId) => {
          setNewPageModalOpen(false);
          navigate('builder', { pageId });
        }}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </AuthProvider>
  );
}

export default App;
