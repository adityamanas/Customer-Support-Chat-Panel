import { create } from "zustand";

export interface ChatThread {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  channel: "WhatsApp" | "SMS" | "Instagram" | "Web";
  status: "open" | "paused" | "newest";
  isOnline?: boolean;
}
export interface Note {
  id: string;
  content: string;
  agent: string;
  timestamp: Date;
  customerId?: string;
}

export interface Customer {
  id: string;
  name: string;
  status: "online" | "offline";
  channel: string;
  phone: string;
  address: string;
  attributes: Record<string, string>;
}

export type MessageType = "text" | "transaction" | "system" | "notification";
export type MessageStatus = "sending" | "delivered" | "read";

export interface ChatMessage {
  id: string;
  threadId: string;
  content: string;
  timestamp: Date;
  sender: "user" | "agent" | "system";
  type: MessageType;
  status?: MessageStatus;
}

interface ChatState {
  notes: Note[];
  threads: ChatThread[];
  selectedThreadId: string | null;
  messages: Record<string, ChatMessage[]>; // Messages organized by threadId
  currentCustomer: Customer;
  // Actions
  selectThread: (threadId: string) => void;
  addThread: (thread: ChatThread) => void;
  updateThread: (threadId: string, updates: Partial<ChatThread>) => void;
  markAsRead: (threadId: string) => void;
  clearSelectedThread: () => void;
  sendMessage: (threadId: string, content: string, type?: MessageType) => void;
  addNote: (content: string, agent?: string, customerId?: string) => void;
  deleteNote: (noteId: string) => void;
  addAttribute: (key: string, value: string) => void;
}

// Mock data for initial state
const initialThreads: ChatThread[] = [
  {
    id: "1",
    customerName: "John Doe",
    lastMessage: "I need help with my order",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unread: true,
    channel: "WhatsApp",
    status: "open",
    isOnline: true,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    lastMessage: "When will my package arrive?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: false,
    channel: "SMS",
    status: "paused",
    isOnline: false,
  },
  {
    id: "3",
    customerName: "Alex Johnson",
    lastMessage: "Thanks for your help!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    unread: false,
    channel: "Instagram",
    status: "newest",
    isOnline: false,
  },
];

// Mock messages for each thread
const initialMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "1-1",
      threadId: "1",
      content: "Hi, I need help with my order",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      sender: "user",
      type: "text",
      status: "read",
    },
    {
      id: "1-2",
      threadId: "1",
      content:
        "Thank you. Please enter the amount and date of the transaction for the bill (December 21th)",
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      sender: "agent",
      type: "transaction",
      status: "delivered",
    },
    {
      id: "1-3",
      threadId: "1",
      content: "Rs50, November 30th",
      timestamp: new Date(Date.now() - 1000 * 60 * 6),
      sender: "user",
      type: "text",
      status: "read",
    },
    {
      id: "1-4",
      threadId: "1",
      content:
        "Thank you. It seems there might be a delay in processing the transaction. What would you like to do next?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      sender: "agent",
      type: "text",
      status: "delivered",
    },
    {
      id: "1-5",
      threadId: "1",
      content: "Speaking to a Representative",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      sender: "system",
      type: "system",
    },
    {
      id: "1-6",
      threadId: "1",
      content: "Chat got taken over by customer service",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      sender: "system",
      type: "system",
    },
    {
      id: "1-7",
      threadId: "1",
      content:
        "Hi, this is Alex from Customer Support. I see you're having an issue with your top-up.",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      sender: "agent",
      type: "text",
      status: "delivered",
    },
  ],
  "2": [
    {
      id: "2-1",
      threadId: "2",
      content: "When will my package arrive?",
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      sender: "user",
      type: "text",
      status: "read",
    },
    {
      id: "2-2",
      threadId: "2",
      content: "Let me check that for you. Can you provide your order number?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      sender: "agent",
      type: "text",
      status: "read",
    },
  ],
  "3": [
    {
      id: "3-1",
      threadId: "3",
      content: "I'm having trouble with my account",
      timestamp: new Date(Date.now() - 1000 * 60 * 65),
      sender: "user",
      type: "text",
      status: "read",
    },
    {
      id: "3-2",
      threadId: "3",
      content: "I've reset your password. Please check your email.",
      timestamp: new Date(Date.now() - 1000 * 60 * 62),
      sender: "agent",
      type: "text",
      status: "read",
    },
    {
      id: "3-3",
      threadId: "3",
      content: "Thanks for your help!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      sender: "user",
      type: "text",
      status: "read",
    },
  ],
};

export const useChatStore = create<ChatState>((set) => ({
  threads: initialThreads,
  selectedThreadId: null,
  messages: initialMessages,

  currentCustomer: {
    id: "202311314235",
    name: "Cora Goyette",
    status: "online",
    channel: "WhatsAppB2B",
    phone: "+626797822012",
    address: "5467 Richmond View Suite 511, Sunrise, Kentucky, 43546-6638",
    attributes: {},
  },

  notes: [
    {
      id: "1",
      content: "Send Sarah an update by email by 4PM tomorrow",
      agent: "Justin Hickle",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "2",
      content: "Customer mentioned billing issue with December transaction",
      agent: "Justin Hickle",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  ],
  selectThread: (threadId) => set({ selectedThreadId: threadId }),

  clearSelectedThread: () => set({ selectedThreadId: null }),
  addNote: (content, agent = "Current Agent", customerId) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      agent,
      timestamp: new Date(),
      customerId,
    };

    set((state) => ({ notes: [newNote, ...state.notes] }));
  },

  deleteNote: (noteId) => {
    set((state) => ({
      notes: state.notes.filter((note: Note) => note.id !== noteId),
    }));
  },

  addThread: (thread) =>
    set((state) => ({
      threads: [...state.threads, thread],
    })),

  updateThread: (threadId, updates) =>
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId ? { ...thread, ...updates } : thread
      ),
    })),

  markAsRead: (threadId) =>
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId ? { ...thread, unread: false } : thread
      ),
    })),

  sendMessage: (threadId, content, type = "text") =>
    set((state) => {
      const newMessage: ChatMessage = {
        id: `${threadId}-${Date.now()}`,
        threadId,
        content,
        timestamp: new Date(),
        sender: "agent",
        type,
        status: "sending",
      };

      // Update messages
      const updatedMessages = {
        ...state.messages,
        [threadId]: [...(state.messages[threadId] || []), newMessage],
      };

      // Update thread's last message
      const updatedThreads = state.threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              lastMessage: content,
              timestamp: new Date(),
            }
          : thread
      );

      return {
        messages: updatedMessages,
        threads: updatedThreads,
      };
    }),

  addAttribute: (key, value) =>
    set((state) => ({
      currentCustomer: {
        ...state.currentCustomer,
        attributes: {
          ...state.currentCustomer.attributes,
          [key]: value,
        },
      },
    })),
}));

// Selector hooks for easier access
export const useThreads = () => useChatStore((state) => state.threads);
export const useSelectedThreadId = () =>
  useChatStore((state) => state.selectedThreadId);
export const useSelectedThread = () => {
  const threads = useThreads();
  const selectedId = useSelectedThreadId();
  return threads.find((thread) => thread.id === selectedId) || null;
};

export const useNotes = () => useChatStore((state) => state.notes);
export const useCurrentCustomer = () => useChatStore((state) => state.currentCustomer);
// export const useMessages = (threadId: string | null) =>
//   useChatStore((state) => {
//     if (!threadId) return [];
//     return state.messages[threadId] || [];
//   });
export const useAddNote = () => useChatStore((state) => state.addNote);
export const useDeleteNote = () => useChatStore((state) => state.deleteNote);
export const useAddAttribute = () => useChatStore((state) => state.addAttribute);
