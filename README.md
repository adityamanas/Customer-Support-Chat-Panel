# Customer Support Chat Panel - Complete Assignment Brief

## **Objective**

Rebuild the customer support chat panel as shown in the attached design using **React**, **TypeScript**, **Vite**, **MUI**, and **Zustand**. The interface should mimic a real-world support tool with agent-side chat management, inbox view, message streaming, and responsive layout. Use the provided **cURL chat API** for live messaging.

## **Tech Stack**

- **React + TypeScript**
- **Vite** (project setup)
- **Material UI (MUI)** for all components. (global theme based approach)
- **Zustand** for state management
- **Vitest** (or Jest) + **React Testing Library** for unit testing (if needed)
- **cURL-based streaming API** (simulated or integrated)

## **Layout Structure**

### **Four-Panel Layout Overview:**

1. **Mini Sidebar** (Far Left - Collapsible)
2. **Left Panel** (Inbox & Filters)
3. **Middle Panel** (Chat Threads & Messages)
4. **Right Panel** (Customer Info & Notes)

---

## **Feature Requirements**

### **1. Mini Sidebar (Far Left Panel)**

- **Collapsible navigation bar** with icons
- **Navigation Items (just place this icons , need not to add any routes associated with them):**
    - Home/Dashboard icon
    - Chat/Messages icon (active state)
    - Settings icon
    - User profile icon at bottom
- **Functionality:**
    - Toggle expand/collapse
    - Highlight active section
    - Smooth animations for state changes
- **Mock Data:** All navigation items should be styled but non-functional

### **2. Left Panel (Inbox & Filters)**

- **Search Bar:**
    - "Search chat" placeholder
    - Search icon
    - Mock functionality (no actual search logic needed)
- **Filter Sections:**
    - **Inbox Filters:**
        - "Assigned to me" (6 items)
        - "Unassigned" (6 items)
        - "All" conversations
    - **Status Filters:**
        - "All" (56 items)
        - "Agent" (123 items)
        - "Awaiting agent" (34 items)
        - "Paused" (89 items)
    - **Channel Filters:**
        - "All" (56 items)
        - "SMS" (123 items)
        - "Whatsapp" (34 items)
        - "Instagram" (89 items)
        - "Web" (89 items)
- **Agents Section:**
    - **Online Agents List:**
        - Olivia Rhye (Online)
        - Alfredo Bayer (Online)
        - Brent Runner (Offline)
    - Profile pictures with online/offline status indicators
    - Mock data for agent availability

### **3. Middle Panel (Chat Threads & Messages)**

### **Thread List View:**

- **Thread Items Display:**
    - Customer name (e.g., "Mr. Rosemary Koss", "Ms. Darin O'Keefe")
    - Message snippet preview
    - Unread message badges (red notification dots)
    - Timestamps
    - Filter tags ("Open", "Newest")

### **Active Chat View:**

- **Chat Header:**
    - Customer name (e.g., "John Doe")
    - Online status indicator
    - Action buttons: "Pause", "Close"
    - WhatsApp channel indicator
- **Message Stream:**
    - **Incoming Messages:** Left-aligned with customer avatar
    - **Outgoing Messages:** Right-aligned (agent responses)
    - **System Messages:** Centered (e.g., "Chat got taken over by customer service")
    - **Timestamps:** Show for each message group
    - **Message Status:** Delivered, read indicators
- **Message Types:**
    - Text messages
    - Transaction notifications (e.g., "Thank you. Please enter the amount and date of the transaction for the bill (December 21th)")
    - System handover messages
    - Processing delay notifications
- **Quick Action Buttons:**
    - "Retry Checking the Balance"
    - "Speak to a Representative"
    - Custom quick reply options

### **Message Input Area:**

- **Rich Text Input:**
    - Placeholder: "Type '/' to use template message"
    - **Slash Command Functionality:**
        - When user types "/", show dropdown with suggested prompts/templates
        - Examples: "/greeting", "/billing_help", "/technical_support"
        - Allow selection from dropdown or continued typing
    - Emoji picker icon
    - File attachment icon
    - Template message icon
- **Action Buttons:**
    - "Assign to Form" button
    - "Send" button (with send icon)

### **4. Right Panel (Customer Info & Notes)**

### **Customer Information:**

- **Customer Details:**
    - Name: "Cora Goyette"
    - Status: "Online"
    - Channel: "WhatsAppB2B"
    - ID: "202311314235"
    - Phone: "+626797822012"
    - Address: "5467 Richmond View Suite 511, Sunrise, Kentucky, 43546-6638"
- **Add Attribute Button:**
    - "+ Add new attribute" functionality
    - Mock form for adding custom customer fields

### **Notes Section:**

- **Agent Activity Log:**
    - Agent name and timestamp (e.g., "Justin Hickle, Feb 23, 18:43")
    - Action descriptions (e.g., "Send Sarah an update by email by 4PM tomorrow")
    - Edit/delete options for each note (three-dot menu)
- **Notes Functionality:**
    - Add new notes
    - Edit existing notes
    - Delete notes
    - Timestamp tracking
    - Agent attribution

---

## **Chat Stream Integration**

### **API Implementation:**

```bash
curl --location 'https://test-stream-python.onrender.com/stream?prompt={your_prompt_text}' \
--header 'x-api-key: 19290737-c14d-4757-90f1-f5ed89014fa4'

```

### **Streaming Features:**

- **Token-by-token streaming** from chatbot responses
- **Real-time message display** with typing indicators
- **Bot-to-human handover** simulation
- **Agent takeover** functionality
- **Message status tracking** (sending, delivered, read)

### **Stream States:**

- Loading/connecting state
- Streaming in progress
- Stream complete
- Error handling
- Reconnection logic

---

## **Interactions & UX Requirements**

### **Navigation & State Management:**

- **Active chat highlighting** in thread list
- **Smooth transitions** between chats
- **Persistent state** using Zustand store
- **Responsive design** for different screen sizes

### **Interactive Elements:**

- **Hover effects** on all clickable items
- **Loading states** for API calls
- **Error handling** with user-friendly messages
- **Keyboard shortcuts** for common actions
- **Accessibility** compliance (ARIA labels, keyboard navigation)

### **Mock vs Real Data:**

- **Mock Data:** All sidebar navigation, filters, agent lists, customer info
- **Real Data:** Only the chat stream responses from the API
- **Persistent Mock State:** Maintain filter selections, active chats, notes

---

## **Testing Requirements (Good to have)**

### **Unit Tests:**

- Component rendering
- State management actions
- Mock API responses
- User interactions
- Form validations

### 

---

## **Slash Command Implementation**

### **Template Messages:**

When user types "/" in the message input:

1. **Show dropdown menu** with options:
    - `/greeting` - "Hello! How can I help you today?"
    - `/billing` - "I can help you with your billing inquiry"
    - `/technical` - "Let me assist you with technical support"
    - `/escalate` - "Let me connect you with a specialist"
    - `/closing` - "Is there anything else I can help you with?"
2. **Functionality:**
    - Filter suggestions as user continues typing
    - Arrow key navigation
    - Enter to select
    - Escape to close
    - Click to select
3. **Auto-complete behavior:**
    - Replace "/" with selected template
    - Allow further editing before sending
    - Show preview of template content

---

## **Performance Considerations**

### **Optimization:**

- **Virtual scrolling** for large chat lists
- **Efficient re-renders** with proper memoization
- **Stream chunking** for large responses

Special Note:  DO NOT USE AI TOOLS TO GENERATE OR WRITE CODE. 

Design : 

![image.png](attachment:24d76bca-0c6d-4784-aa42-7ccef0f491aa:image.png)
