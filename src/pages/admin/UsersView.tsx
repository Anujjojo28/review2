import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Users, Shield, UserCheck, Eye, KeyRound, Check } from 'lucide-react';

export const UsersView: React.FC = () => {
  const { users, currentUser, updateUserRole, quickLoginAs, isAdmin } = useAuth();

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
            <Shield className="w-3 h-3 text-purple-600" />
            Admin
          </span>
        );
      case 'editor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            <UserCheck className="w-3 h-3 text-amber-600" />
            Editor
          </span>
        );
      case 'viewer':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Eye className="w-3 h-3 text-emerald-600" />
            Viewer
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200 mb-1">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            Role-Based Access Control (RBAC)
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            User Roles & Permissions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative privileges, editorial team access, and public preview permissions.
          </p>
        </div>
      </div>

      {/* Role Explanations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-purple-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold text-slate-900">Administrator Role</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full permissions. Can create, edit, approve/reject workflow submissions, publish pages directly, and configure SEO & system settings.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-slate-900">Editor Role</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Content creators. Can assemble pages with the drag & drop builder and submit drafts to the Admin approval queue with notes.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900">Viewer Role</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Read-only preview. Access live published websites and inspect published content without editorial permissions.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200/80 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4">Change Role</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Switch Active Identity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          {u.name}
                          {currentUser?.id === u.id && (
                            <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded font-bold">
                              Current You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getRoleBadge(u.role)}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                      className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    {currentUser?.id === u.id ? (
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Active Session
                      </span>
                    ) : (
                      <button
                        onClick={() => quickLoginAs(u.role)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 rounded-lg text-xs font-semibold transition"
                      >
                        Switch to this User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
