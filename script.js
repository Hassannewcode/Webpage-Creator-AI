// DOM Elements
const messageInput = document.getElementById('messageInput');
const splitMessageInput = document.getElementById('splitMessageInput');
const sendButton = document.getElementById('sendButton');
const splitSendButton = document.getElementById('splitSendButton');
const chatMessages = document.getElementById('chatMessages');
const splitChatMessages = document.getElementById('splitChatMessages');
const typingIndicator = document.getElementById('typingIndicator');
const splitTypingIndicator = document.getElementById('splitTypingIndicator');
const welcomeSection = document.getElementById('welcomeSection');
const characterCount = document.getElementById('characterCount');
const clearChatBtn = document.getElementById('clearChat');
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const closeModal = document.getElementById('closeModal');
const examplePrompts = document.querySelectorAll('.example-prompt');

// Split view elements
const viewToggle = document.getElementById('viewToggle');
const chatOnlyView = document.getElementById('chatOnlyView');
const splitView = document.getElementById('splitView');
const codeLanguage = document.getElementById('codeLanguage');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const refreshPreview = document.getElementById('refreshPreview');
const openInNewTab = document.getElementById('openInNewTab');
const codeGenerationStatus = document.getElementById('codeGenerationStatus');
const generatedCode = document.getElementById('generatedCode');
const previewFrame = document.getElementById('previewFrame');

// State
let isTyping = false;
let messageHistory = [];
let isSplitView = false;
let currentCode = {
    html: '',
    css: '',
    javascript: ''
};

// Code generation templates
const codeTemplates = {
    'landing page': {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cozy Coffee Shop</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23d4a574" width="1200" height="600"/><text x="600" y="300" text-anchor="middle" fill="white" font-size="48" font-family="Arial">Coffee Background</text></svg>'); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; color: white; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { background: #d4a574; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background 0.3s; }
        .btn:hover { background: #b8935f; }
        .section { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
        .menu-item { background: #f9f9f9; padding: 2rem; border-radius: 10px; text-align: center; }
        .menu-item h3 { color: #d4a574; margin-bottom: 1rem; }
        .price { font-size: 1.5rem; font-weight: bold; color: #333; }
    </style>
</head>
<body>
    <section class="hero">
        <div>
            <h1>Cozy Coffee Shop</h1>
            <p>Where every cup tells a story</p>
            <a href="#menu" class="btn">View Our Menu</a>
        </div>
    </section>
    
    <section id="menu" class="section">
        <h2 style="text-align: center; margin-bottom: 2rem; color: #d4a574;">Our Menu</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <h3>Espresso</h3>
                <p>Rich and bold, perfect for coffee purists</p>
                <div class="price">$3.50</div>
            </div>
            <div class="menu-item">
                <h3>Cappuccino</h3>
                <p>Creamy foam meets perfect espresso</p>
                <div class="price">$4.25</div>
            </div>
            <div class="menu-item">
                <h3>Latte</h3>
                <p>Smooth and milky with artistic foam</p>
                <div class="price">$4.75</div>
            </div>
        </div>
    </section>
</body>
</html>`,
        css: `/* Coffee Shop Styles */
.hero {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                url('coffee-bg.jpg');
    background-size: cover;
    background-position: center;
}

.btn {
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
}

.menu-item {
    transition: transform 0.3s ease;
}

.menu-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}`,
        javascript: `// Coffee Shop Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for menu link
    document.querySelector('a[href="#menu"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('menu').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Simple order functionality
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('h3').textContent;
            alert(\`Added \${itemName} to your order!\`);
        });
    });
});`
    },
    'loading spinner': {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading Spinner Animation</title>
    <style>
        body { margin: 0; padding: 0; height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f0f0; font-family: Arial, sans-serif; }
        .spinner-container { text-align: center; }
        .spinner { width: 60px; height: 60px; border: 4px solid #e3e3e3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-text { color: #666; font-size: 18px; }
        .dots { animation: dots 1.5s infinite; }
        @keyframes dots { 0%, 20% { content: ''; } 40% { content: '.'; } 60% { content: '..'; } 80%, 100% { content: '...'; } }
    </style>
</head>
<body>
    <div class="spinner-container">
        <div class="spinner"></div>
        <div class="loading-text">Loading<span class="dots"></span></div>
    </div>
</body>
</html>`,
        css: `.spinner {
    width: 60px;
    height: 60px;
    border: 4px solid #e3e3e3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Alternative spinner styles */
.pulse-spinner {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border-radius: 100%;
    animation: pulse-scale 1.0s infinite ease-in-out;
}

@keyframes pulse-scale {
    0% { transform: scale(0); }
    100% { transform: scale(1.0); opacity: 0; }
}`,
        javascript: `// Loading Spinner Controls
class LoadingSpinner {
    constructor(container) {
        this.container = container;
        this.isLoading = false;
    }
    
    show() {
        this.isLoading = true;
        this.container.style.display = 'flex';
    }
    
    hide() {
        this.isLoading = false;
        this.container.style.display = 'none';
    }
    
    toggle() {
        if (this.isLoading) {
            this.hide();
        } else {
            this.show();
        }
    }
}

// Usage example
document.addEventListener('DOMContentLoaded', function() {
    const spinnerContainer = document.querySelector('.spinner-container');
    const loader = new LoadingSpinner(spinnerContainer);
    
    // Simulate loading
    setTimeout(() => {
        loader.hide();
        document.body.innerHTML += '<div style="text-align: center; padding: 20px;"><h2>Content Loaded!</h2></div>';
    }, 3000);
});`
    },
    'todo list': {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List App</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fa; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 2rem; margin-bottom: 10px; }
        .input-section { padding: 20px; border-bottom: 1px solid #eee; }
        .input-group { display: flex; gap: 10px; }
        .todo-input { flex: 1; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; }
        .add-btn { background: #667eea; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .add-btn:hover { background: #5a6fd8; }
        .todo-list { min-height: 300px; }
        .todo-item { display: flex; align-items: center; padding: 15px 20px; border-bottom: 1px solid #eee; transition: background 0.2s; }
        .todo-item:hover { background: #f8f9fa; }
        .todo-item.completed { opacity: 0.6; text-decoration: line-through; }
        .todo-checkbox { margin-right: 15px; }
        .todo-text { flex: 1; font-size: 16px; }
        .delete-btn { background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
        .stats { padding: 20px; background: #f8f9fa; text-align: center; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>My Todo List</h1>
            <p>Stay organized and productive</p>
        </div>
        
        <div class="input-section">
            <div class="input-group">
                <input type="text" class="todo-input" placeholder="Add a new task..." id="todoInput">
                <button class="add-btn" id="addBtn">Add Task</button>
            </div>
        </div>
        
        <div class="todo-list" id="todoList">
            <!-- Todo items will be added here -->
        </div>
        
        <div class="stats" id="stats">
            <span id="totalTasks">0</span> total tasks, 
            <span id="completedTasks">0</span> completed
        </div>
    </div>
</body>
</html>`,
        css: `.todo-item {
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.todo-item:hover {
    border-left-color: #667eea;
    background: #f8f9fa;
}

.todo-item.completed {
    background: #f1f3f4;
    border-left-color: #28a745;
}

.delete-btn {
    transition: all 0.2s ease;
    opacity: 0.7;
}

.delete-btn:hover {
    opacity: 1;
    transform: scale(1.05);
}

.add-btn {
    transition: all 0.2s ease;
}

.add-btn:active {
    transform: scale(0.98);
}`,
        javascript: `// Todo List App
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        
        this.init();
    }
    
    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.render();
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        this.todos.push(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
    }
    
    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveTodos();
        this.render();
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    render() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
            
            todoItem.innerHTML = \`
                <input type="checkbox" class="todo-checkbox" \${todo.completed ? 'checked' : ''}>
                <span class="todo-text">\${todo.text}</span>
                <button class="delete-btn">Delete</button>
            \`;
            
            const checkbox = todoItem.querySelector('.todo-checkbox');
            const deleteBtn = todoItem.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
            
            this.todoList.appendChild(todoItem);
        });
        
        this.updateStats();
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        
        this.totalTasks.textContent = total;
        this.completedTasks.textContent = completed;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});`
    },
    'navigation menu': {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Navigation Menu</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; }
        .navbar { background: #2c3e50; color: white; padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 2rem; }
        .nav-logo { font-size: 1.5rem; font-weight: bold; color: #3498db; }
        .nav-menu { display: flex; list-style: none; gap: 2rem; }
        .nav-link { color: white; text-decoration: none; transition: color 0.3s; }
        .nav-link:hover { color: #3498db; }
        .hamburger { display: none; flex-direction: column; cursor: pointer; }
        .hamburger span { width: 25px; height: 3px; background: white; margin: 3px 0; transition: 0.3s; }
        .content { margin-top: 80px; padding: 2rem; }
        .section { min-height: 500px; padding: 4rem 2rem; text-align: center; }
        .section:nth-child(even) { background: #f8f9fa; }
        @media (max-width: 768px) {
            .nav-menu { position: fixed; left: -100%; top: 70px; flex-direction: column; background: #2c3e50; width: 100%; text-align: center; transition: 0.3s; padding: 2rem 0; }
            .nav-menu.active { left: 0; }
            .hamburger { display: flex; }
            .hamburger.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
            .hamburger.active span:nth-child(2) { opacity: 0; }
            .hamburger.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">Brand</div>
            <ul class="nav-menu" id="navMenu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    
    <div class="content">
        <section id="home" class="section">
            <h1>Welcome to Our Website</h1>
            <p>This is a responsive navigation menu demo</p>
        </section>
        
        <section id="about" class="section">
            <h2>About Us</h2>
            <p>Learn more about our company and mission</p>
        </section>
        
        <section id="services" class="section">
            <h2>Our Services</h2>
            <p>Discover what we can do for you</p>
        </section>
        
        <section id="contact" class="section">
            <h2>Contact Us</h2>
            <p>Get in touch with our team</p>
        </section>
    </div>
</body>
</html>`,
        css: `/* Enhanced Navigation Styles */
.navbar {
    backdrop-filter: blur(10px);
    background: rgba(44, 62, 80, 0.95);
}

.nav-link {
    position: relative;
    padding: 0.5rem 0;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3498db;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.hamburger span {
    border-radius: 2px;
}

.section {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`,
        javascript: `// Responsive Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});`
    }
};

// AI Response Templates
const aiResponses = {
    greeting: [
        "Hello! I'm Manus AI, your intelligent assistant with live code generation capabilities. I can create HTML, CSS, and JavaScript code in real-time and show you the preview instantly. What would you like me to build?",
        "Hi there! I'm here to help you create amazing web experiences. I can generate code live and show you the results immediately. What project shall we start with?",
        "Welcome! I'm Manus AI, ready to help you build websites, apps, and interactive features with live code generation and preview. What would you like to create?"
    ],
    default: [
        "I'd be happy to help you with that! Could you provide more details about what you'd like me to create? I can generate HTML, CSS, and JavaScript code with live preview.",
        "That sounds interesting! To give you the best code solution, could you tell me more about the specific features or design you have in mind?",
        "I'm ready to help you build that! Please share more details about the functionality, styling, or specific requirements you'd like me to implement."
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateSendButtons();
    setupEventListeners();
    autoResizeTextareas();
    syncChatViews();
});

// Event Listeners
function setupEventListeners() {
    // Input handling for both views
    messageInput.addEventListener('input', () => handleInputChange(messageInput, 'characterCount'));
    splitMessageInput.addEventListener('input', () => handleInputChange(splitMessageInput, 'characterCount'));
    
    messageInput.addEventListener('keydown', (e) => handleKeyDown(e, false));
    splitMessageInput.addEventListener('keydown', (e) => handleKeyDown(e, true));
    
    sendButton.addEventListener('click', () => sendMessage(false));
    splitSendButton.addEventListener('click', () => sendMessage(true));
    
    // View toggle
    viewToggle.addEventListener('click', toggleView);
    
    // Other controls
    clearChatBtn.addEventListener('click', clearChat);
    aboutBtn.addEventListener('click', showAboutModal);
    closeModal.addEventListener('click', hideAboutModal);
    aboutModal.addEventListener('click', handleModalClick);
    
    // Code controls
    copyCodeBtn.addEventListener('click', copyCode);
    refreshPreview.addEventListener('click', updatePreview);
    openInNewTab.addEventListener('click', openPreviewInNewTab);
    codeLanguage.addEventListener('change', updateCodeDisplay);
    
    // Example prompts
    examplePrompts.forEach(prompt => {
        prompt.addEventListener('click', function() {
            const promptText = this.getAttribute('data-prompt');
            if (isSplitView) {
                splitMessageInput.value = promptText;
            } else {
                messageInput.value = promptText;
            }
            updateSendButtons();
            sendMessage(isSplitView);
        });
    });
}

// View Management
function toggleView() {
    isSplitView = !isSplitView;
    
    if (isSplitView) {
        chatOnlyView.style.display = 'none';
        splitView.style.display = 'flex';
        viewToggle.classList.add('active');
        viewToggle.querySelector('.toggle-text').textContent = 'Chat View';
        syncChatToSplit();
    } else {
        chatOnlyView.style.display = 'flex';
        splitView.style.display = 'none';
        viewToggle.classList.remove('active');
        viewToggle.querySelector('.toggle-text').textContent = 'Split View';
        syncSplitToChat();
    }
}

function syncChatViews() {
    // Keep both chat views in sync
    if (messageHistory.length > 0) {
        syncChatToSplit();
    }
}

function syncChatToSplit() {
    splitChatMessages.innerHTML = chatMessages.innerHTML;
}

function syncSplitToChat() {
    chatMessages.innerHTML = splitChatMessages.innerHTML;
}

// Input handling
function handleInputChange(input, counterId) {
    const value = input.value;
    if (counterId && document.getElementById(counterId)) {
        document.getElementById(counterId).textContent = `${value.length}/2000`;
    }
    updateSendButtons();
    autoResizeTextareas();
}

function handleKeyDown(e, isSplit) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const button = isSplit ? splitSendButton : sendButton;
        if (!button.disabled) {
            sendMessage(isSplit);
        }
    }
}

function updateSendButtons() {
    const hasText = messageInput.value.trim().length > 0;
    const hasSplitText = splitMessageInput.value.trim().length > 0;
    
    sendButton.disabled = !hasText || isTyping;
    splitSendButton.disabled = !hasSplitText || isTyping;
}

function autoResizeTextareas() {
    [messageInput, splitMessageInput].forEach(textarea => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    });
}

// Message handling
function sendMessage(isSplit) {
    const input = isSplit ? splitMessageInput : messageInput;
    const message = input.value.trim();
    if (!message || isTyping) return;
    
    // Hide welcome section
    if (welcomeSection && !isSplit) {
        welcomeSection.style.display = 'none';
    }
    
    // Add user message to appropriate view
    addMessage(message, 'user', isSplit);
    messageHistory.push({ role: 'user', content: message });
    
    // Clear input
    input.value = '';
    updateSendButtons();
    autoResizeTextareas();
    if (characterCount) characterCount.textContent = '0/2000';
    
    // Show typing indicator and generate response
    showTypingIndicator(isSplit);
    
    // Check if this is a code generation request
    const isCodeRequest = detectCodeRequest(message);
    
    setTimeout(() => {
        const response = generateAIResponse(message);
        hideTypingIndicator(isSplit);
        addMessage(response, 'ai', isSplit);
        messageHistory.push({ role: 'ai', content: response });
        
        // If it's a code request and we're in split view, generate code
        if (isCodeRequest && isSplit) {
            generateCode(message);
        }
        
        // Sync views
        if (isSplit) {
            syncSplitToChat();
        } else {
            syncChatToSplit();
        }
    }, 1500 + Math.random() * 2000);
}

function detectCodeRequest(message) {
    const codeKeywords = ['create', 'build', 'make', 'generate', 'write', 'code', 'html', 'css', 'javascript', 'website', 'page', 'app', 'component'];
    return codeKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

function generateCode(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Show generating status
    codeGenerationStatus.innerHTML = '<div class="status-message generating">Generating code...</div>';
    codeGenerationStatus.classList.add('generating');
    
    setTimeout(() => {
        let template = null;
        
        // Match user request to templates
        if (message.includes('landing page') || message.includes('coffee')) {
            template = codeTemplates['landing page'];
        } else if (message.includes('spinner') || message.includes('loading')) {
            template = codeTemplates['loading spinner'];
        } else if (message.includes('todo') || message.includes('task')) {
            template = codeTemplates['todo list'];
        } else if (message.includes('navigation') || message.includes('menu')) {
            template = codeTemplates['navigation menu'];
        } else {
            // Default to a simple HTML template
            template = {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; margin-bottom: 20px; }
        p { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Your Generated Page</h1>
        <p>This page was generated based on your request. You can customize it further by modifying the HTML, CSS, and JavaScript code.</p>
    </div>
</body>
</html>`,
                css: `/* Custom styles for your page */
.container {
    transition: all 0.3s ease;
}

.container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}`,
                javascript: `// Interactive features for your page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
    
    // Add click interaction
    document.querySelector('.container').addEventListener('click', function() {
        this.style.background = this.style.background === 'lightblue' ? 'white' : 'lightblue';
    });
});`
            };
        }
        
        // Store the generated code
        currentCode = template;
        
        // Update code display
        updateCodeDisplay();
        
        // Update preview
        updatePreview();
        
        // Update status
        codeGenerationStatus.innerHTML = '<div class="status-message">Code generated successfully!</div>';
        codeGenerationStatus.classList.remove('generating');
        
    }, 2000 + Math.random() * 1000);
}

function updateCodeDisplay() {
    const language = codeLanguage.value;
    const code = currentCode[language] || '// No code available for this language';
    generatedCode.textContent = code;
}

function updatePreview() {
    if (currentCode.html) {
        previewFrame.srcdoc = currentCode.html;
    }
}

function copyCode() {
    const code = generatedCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        copyCodeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>';
        setTimeout(() => {
            copyCodeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
    });
}

function openPreviewInNewTab() {
    if (currentCode.html) {
        const newWindow = window.open();
        newWindow.document.write(currentCode.html);
        newWindow.document.close();
    }
}

function addMessage(text, sender, isSplit = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = `<div class="${sender}-avatar">${sender === 'user' ? 'You' : 'AI'}</div>`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textP = document.createElement('p');
    textP.className = 'message-text';
    textP.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    contentDiv.appendChild(textP);
    contentDiv.appendChild(timeDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    const targetContainer = isSplit ? splitChatMessages : chatMessages;
    targetContainer.appendChild(messageDiv);
    scrollToBottom(targetContainer);
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse(aiResponses.greeting);
    } else if (detectCodeRequest(message)) {
        if (message.includes('landing page') || message.includes('coffee')) {
            return "I'll create a beautiful coffee shop landing page for you! This will include a hero section, menu display, and responsive design. Check the code panel to see the HTML, CSS, and JavaScript being generated in real-time.";
        } else if (message.includes('spinner') || message.includes('loading')) {
            return "Perfect! I'm creating a smooth CSS loading spinner animation with multiple style variations. You'll see the code generation in the middle panel and the live preview on the right.";
        } else if (message.includes('todo') || message.includes('task')) {
            return "Great idea! I'm building a fully functional todo list app with local storage, add/delete functionality, and completion tracking. Watch the code come together in real-time!";
        } else if (message.includes('navigation') || message.includes('menu')) {
            return "Excellent! I'm creating a responsive navigation menu that works perfectly on both desktop and mobile devices. It includes smooth scrolling and active section highlighting.";
        } else {
            return "I'm generating custom code based on your request! You can see the live code generation in the middle panel and the preview on the right. Feel free to ask me to modify or enhance any part of the code.";
        }
    } else {
        return getRandomResponse(aiResponses.default);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function showTypingIndicator(isSplit = false) {
    isTyping = true;
    const indicator = isSplit ? splitTypingIndicator : typingIndicator;
    indicator.style.display = 'block';
    updateSendButtons();
    const container = isSplit ? splitChatMessages : chatMessages;
    scrollToBottom(container);
}

function hideTypingIndicator(isSplit = false) {
    isTyping = false;
    const indicator = isSplit ? splitTypingIndicator : typingIndicator;
    indicator.style.display = 'none';
    updateSendButtons();
}

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

// Chat management
function clearChat() {
    chatMessages.innerHTML = '';
    splitChatMessages.innerHTML = '';
    messageHistory = [];
    currentCode = { html: '', css: '', javascript: '' };
    
    if (welcomeSection) {
        welcomeSection.style.display = 'flex';
    }
    
    // Reset code panel
    generatedCode.textContent = '// Your generated code will appear here\n// Ask the AI to create HTML, CSS, or JavaScript\n\nconsole.log("Welcome to Manus AI Live Code Generation!");';
    previewFrame.srcdoc = "<html><body><div style='display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Inter, sans-serif; color: #666;'><div style='text-align: center;'><h2>Live Preview</h2><p>Generated code will be previewed here</p></div></div></body></html>";
    codeGenerationStatus.innerHTML = '<div class="status-message">Ready to generate code...</div>';
    codeGenerationStatus.classList.remove('generating');
    
    const activeInput = isSplitView ? splitMessageInput : messageInput;
    activeInput.focus();
}

// Modal handling
function showAboutModal() {
    aboutModal.style.display = 'flex';
}

function hideAboutModal() {
    aboutModal.style.display = 'none';
}

function handleModalClick(e) {
    if (e.target === aboutModal) {
        hideAboutModal();
    }
}

// Focus input on page load
window.addEventListener('load', function() {
    messageInput.focus();
});

// Handle window resize
window.addEventListener('resize', function() {
    const containers = [chatMessages, splitChatMessages];
    containers.forEach(container => {
        if (container) scrollToBottom(container);
    });
});

