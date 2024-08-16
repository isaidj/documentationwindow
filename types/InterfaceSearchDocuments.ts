export interface SearchResponse {
  pagination: {
    limit: number;
    offset: number;
    nextPath: string;
  };
  data: Array<{
    ranking: number;
    context: string;
    document: {
      id: string;
      url: string;
      urlId: string;
      title: string;
      text: string;
      icon: string | null;
      color: string | null;
      tasks: {
        completed: number;
        total: number;
      };
      createdAt: string;
      createdBy: User;
      updatedAt: string;
      updatedBy: User;
      publishedAt: string;
      archivedAt: string | null;
      deletedAt: string | null;
      teamId: string;
      collaboratorIds: string[];
      revision: number;
      fullWidth: boolean;
      collectionId: string;
      parentDocumentId: string | null;
      lastViewedAt: string;
      isCollectionDeleted: boolean;
      dataAttributes: any | null;
      templateId: string | null;
      template: boolean;
      insightsEnabled: boolean;
    };
  }>;
  policies: Array<{
    id: string;
    abilities: {
      read: boolean;
      listRevisions: boolean;
      listViews: boolean;
      download: boolean;
      comment: boolean;
      star: boolean;
      unstar: boolean;
      subscribe: boolean;
      unsubscribe: boolean;
      share: boolean;
      update: boolean;
      publish: boolean;
      manageUsers: boolean;
      duplicate: boolean;
      move: boolean;
      createChildDocument: boolean;
      updateInsights: boolean;
      pin: boolean;
      unpin: boolean;
      pinToHome: boolean;
      delete: boolean;
      restore: boolean;
      permanentDelete: boolean;
      archive: boolean;
      unarchive: boolean;
      unpublish: boolean;
    };
  }>;
  status: number;
  ok: boolean;
}

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
  color: string;
  role: string;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
}

export default SearchResponse;
