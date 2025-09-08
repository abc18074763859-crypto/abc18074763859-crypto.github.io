// 初始化数据存储
const STORAGE_KEYS = {
    TOOLS: 'ai_tools',
    CATEGORIES: 'ai_categories',
    SETTINGS: 'ai_settings',
    ACTIVITIES: 'ai_activities'
};

// 颜色列表
const COLORS = [
    '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', 
    '#f97316', '#ec4899', '#06b6d4', '#84cc16', 
    '#f59e0b', '#14b8a6', '#6366f1', '#d946ef',
    '#2563eb', '#16a34a', '#7c3aed', '#dc2626'
];

// DOM元素
const navItems = document.querySelectorAll('.nav-item');
const pageContents = document.querySelectorAll('.page-content');
const pageTitle = document.getElementById('page-title');
const addToolBtn = document.getElementById('add-tool-btn');
const addCategoryBtn = document.getElementById('add-category-btn');
const toolModal = document.getElementById('tool-modal');
const categoryModal = document.getElementById('category-modal');
const confirmModal = document.getElementById('confirm-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const cancelButtons = document.querySelectorAll('.cancel-btn');
const toolForm = document.getElementById('tool-form');
const categoryForm = document.getElementById('category-form');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const toolsTableBody = document.getElementById('tools-table-body');
const categoriesGrid = document.getElementById('categories-grid');
const toolSearchInput = document.getElementById('tool-search');
const categoryFilter = document.getElementById('category-filter');
const toolSearchBtn = document.querySelector('.search-btn');
const toast = document.getElementById('toast');
const totalToolsElement = document.getElementById('total-tools');
const totalCategoriesElement = document.getElementById('total-categories');
const lastUpdateElement = document.getElementById('last-update');
const activityList = document.getElementById('activity-list');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const backupDataBtn = document.getElementById('backup-data-btn');
const restoreDataBtn = document.getElementById('restore-data-btn');
const restoreFileInput = document.getElementById('restore-file');
const generalSettingsForm = document.getElementById('general-settings-form');
const themeSettingsForm = document.getElementById('theme-settings-form');
const toolIconInput = document.getElementById('tool-icon');
const previewIcon = document.getElementById('preview-icon');
const categoryIconInput = document.getElementById('category-icon');
const categoryPreviewIcon = document.getElementById('category-preview-icon');

// 初始化应用
function initApp() {
    // 尝试从localStorage加载数据，如果没有则初始化
    initializeData();
    
    // 加载现有数据到界面
    loadTools();
    loadCategories();
    loadDashboardStats();
    loadActivities();
    loadSettings();
    
    // 设置事件监听器
    setupEventListeners();
}

// 初始化数据
function initializeData() {
    // 初始化工具数据
    if (!localStorage.getItem(STORAGE_KEYS.TOOLS)) {
        // 从index.html导入工具数据
        const toolsData = extractToolsFromIndexHtml();
        saveData(STORAGE_KEYS.TOOLS, toolsData);
    }
    
    // 初始化分类数据
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
        // 从index.html导入分类数据
        const categoriesData = extractCategoriesFromIndexHtml();
        saveData(STORAGE_KEYS.CATEGORIES, categoriesData);
    }
    
    // 初始化活动数据
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
        saveData(STORAGE_KEYS.ACTIVITIES, []);
    }
    
    // 初始化设置数据
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        const defaultSettings = {
            siteTitle: '联合信息AI工具导航平台',
            siteDescription: '精心整理的AI工具集合，助力您在智能时代高效工作与创作',
            primaryColor: '#3b82f6',
            secondaryColor: '#10b981'
        };
        saveData(STORAGE_KEYS.SETTINGS, defaultSettings);
    }
}

// 从index.html提取工具数据
function extractToolsFromIndexHtml() {
    const tools = [];
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach((card, index) => {
        const iconElement = card.querySelector('.tool-icon i');
        const iconClass = iconElement ? Array.from(iconElement.classList).find(cls => cls.startsWith('fa-')) : 'fa-robot';
        
        let toolName = card.querySelector('.tool-name')?.textContent || card.querySelector('h3')?.textContent || '未知工具';
        let toolDesc = card.querySelector('.tool-desc')?.textContent || card.querySelector('p')?.textContent || '';
        let toolLink = card.querySelector('.tool-link')?.getAttribute('href') || '#';
        let toolTag = card.querySelector('.tool-tag')?.textContent || '';
        
        // 确定分类
        let category = '其他';
        const section = card.closest('section');
        if (section) {
            const sectionId = section.id;
            if (sectionId.includes('chat')) category = '智能对话与知识处理';
            else if (sectionId.includes('design')) category = '创意设计与内容生成';
            else if (sectionId.includes('coding')) category = '编程与开发效率';
            else if (sectionId.includes('productivity')) category = '生产力与企业级应用';
            else if (sectionId.includes('vertical')) category = '垂直领域解决方案';
        }
        
        tools.push({
            id: `tool_${Date.now()}_${index}`,
            name: toolName.trim(),
            description: toolDesc.trim(),
            url: toolLink,
            icon: iconClass,
            category: category,
            tag: toolTag.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    });
    
    return tools;
}

// 从index.html提取分类数据
function extractCategoriesFromIndexHtml() {
    const categories = [];
    const sections = document.querySelectorAll('section[id$="-section"]');
    
    sections.forEach((section, index) => {
        const sectionTitle = section.querySelector('.section-title');
        const sectionId = section.id;
        
        if (sectionTitle) {
            const iconElement = sectionTitle.querySelector('i');
            const iconClass = iconElement ? Array.from(iconElement.classList).find(cls => cls.startsWith('fa-')) : 'fa-th-large';
            const title = sectionTitle.textContent.trim();
            
            categories.push({
                id: `category_${Date.now()}_${index}`,
                name: title.replace(/^\s*[\w\W]*?\s+/, '').replace(/\s*$/, ''), // 移除图标部分
                icon: iconClass,
                color: COLORS[index % COLORS.length],
                sectionId: sectionId,
                order: index
            });
        }
    });
    
    return categories;
}

// 保存数据到localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 从localStorage加载数据
function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// 设置事件监听器
function setupEventListeners() {
    // 导航切换
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('href').substring(1);
            
            // 更新活动状态
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // 更新页面内容
            pageContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            
            // 更新页面标题
            pageTitle.textContent = item.textContent.trim();
        });
    });
    
    // 添加工具按钮
    addToolBtn.addEventListener('click', () => {
        document.getElementById('modal-title').textContent = '添加新工具';
        toolForm.reset();
        document.getElementById('tool-id').value = '';
        previewIcon.className = 'fas fa-robot';
        openModal(toolModal);
        loadCategoriesIntoSelect();
    });
    
    // 添加分类按钮
    addCategoryBtn.addEventListener('click', () => {
        document.getElementById('category-modal-title').textContent = '添加新分类';
        categoryForm.reset();
        document.getElementById('category-id').value = '';
        categoryPreviewIcon.className = 'fas fa-th-large';
        openModal(categoryModal);
    });
    
    // 关闭模态框按钮
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // 取消按钮
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // 工具表单提交
    toolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveTool();
    });
    
    // 分类表单提交
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveCategory();
    });
    
    // 确认删除
    confirmDeleteBtn.addEventListener('click', performDelete);
    
    // 取消删除
    cancelDeleteBtn.addEventListener('click', closeAllModals);
    
    // 工具搜索
    toolSearchBtn.addEventListener('click', searchTools);
    toolSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchTools();
    });
    
    // 分类筛选
    categoryFilter.addEventListener('change', filterTools);
    
    // 标签切换
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabButtons.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // 备份数据
    backupDataBtn.addEventListener('click', backupData);
    
    // 恢复数据
    restoreDataBtn.addEventListener('click', () => {
        restoreFileInput.click();
    });
    
    // 文件选择
    restoreFileInput.addEventListener('change', restoreData);
    
    // 设置表单提交
    generalSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveGeneralSettings();
    });
    
    themeSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveThemeSettings();
    });
    
    // 图标预览
    toolIconInput.addEventListener('input', updateToolIconPreview);
    categoryIconInput.addEventListener('input', updateCategoryIconPreview);
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === toolModal || e.target === categoryModal || e.target === confirmModal) {
            closeAllModals();
        }
    });
}

// 打开模态框
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭所有模态框
function closeAllModals() {
    toolModal.classList.remove('active');
    categoryModal.classList.remove('active');
    confirmModal.classList.remove('active');
    document.body.style.overflow = '';
}

// 加载工具列表
function loadTools() {
    const tools = loadData(STORAGE_KEYS.TOOLS);
    toolsTableBody.innerHTML = '';
    
    if (tools.length === 0) {
        toolsTableBody.innerHTML = '<tr class="no-data"><td colspan="7">暂无工具数据</td></tr>';
        return;
    }
    
    tools.forEach(tool => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tool.id.substring(0, 8)}</td>
            <td>${tool.name}</td>
            <td><i class="fas ${tool.icon}"></i></td>
            <td>${tool.category}</td>
            <td>${tool.description.substring(0, 50)}${tool.description.length > 50 ? '...' : ''}</td>
            <td><a href="${tool.url}" target="_blank">${tool.url.substring(0, 30)}${tool.url.length > 30 ? '...' : ''}</a></td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${tool.id}">编辑</button>
                    <button class="delete-btn" data-id="${tool.id}" data-type="tool">删除</button>
                </div>
            </td>
        `;
        toolsTableBody.appendChild(row);
    });
    
    // 添加编辑和删除事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editTool(btn.getAttribute('data-id')));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showConfirmModal(btn.getAttribute('data-id'), btn.getAttribute('data-type'));
        });
    });
}

// 加载分类列表
function loadCategories() {
    const categories = loadData(STORAGE_KEYS.CATEGORIES);
    categoriesGrid.innerHTML = '';
    
    if (categories.length === 0) {
        categoriesGrid.innerHTML = '<div class="no-categories">暂无分类数据</div>';
        return;
    }
    
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-info">
                <div class="category-icon" style="background-color: ${category.color};">
                    <i class="fas ${category.icon}"></i>
                </div>
                <div class="category-details">
                    <h4>${category.name}</h4>
                    <p>${getToolsCountByCategory(category.name)} 个工具</p>
                </div>
            </div>
            <div class="action-buttons">
                <button class="edit-btn" data-id="${category.id}">编辑</button>
                <button class="delete-btn" data-id="${category.id}" data-type="category">删除</button>
            </div>
        `;
        categoriesGrid.appendChild(card);
    });
    
    // 添加编辑和删除事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editCategory(btn.getAttribute('data-id')));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showConfirmModal(btn.getAttribute('data-id'), btn.getAttribute('data-type'));
        });
    });
}

// 加载仪表盘统计数据
function loadDashboardStats() {
    const tools = loadData(STORAGE_KEYS.TOOLS);
    const categories = loadData(STORAGE_KEYS.CATEGORIES);
    
    totalToolsElement.textContent = tools.length;
    totalCategoriesElement.textContent = categories.length;
    
    // 计算最后更新时间
    if (tools.length > 0) {
        const sortedTools = [...tools].sort((a, b) => 
            new Date(b.updatedAt) - new Date(a.createdAt)
        );
        lastUpdateElement.textContent = formatDate(new Date(sortedTools[0].updatedAt));
    }
}

// 加载活动记录
function loadActivities() {
    const activities = loadData(STORAGE_KEYS.ACTIVITIES);
    activityList.innerHTML = '';
    
    if (activities.length === 0) {
        activityList.innerHTML = '<div class="no-activities">暂无活动记录</div>';
        return;
    }
    
    // 按时间排序，最新的在前
    const sortedActivities = [...activities].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // 只显示最近10条
    const recentActivities = sortedActivities.slice(0, 10);
    
    recentActivities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon" style="background-color: ${activity.color};">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p class="activity-text">${activity.text}</p>
                <p class="activity-time">${formatDateTime(new Date(activity.timestamp))}</p>
            </div>
        `;
        activityList.appendChild(item);
    });
}

// 加载设置
function loadSettings() {
    const settings = loadData(STORAGE_KEYS.SETTINGS);
    
    if (settings) {
        document.getElementById('site-title').value = settings.siteTitle || '';
        document.getElementById('site-description').value = settings.siteDescription || '';
        document.getElementById('primary-color').value = settings.primaryColor || '#3b82f6';
        document.getElementById('secondary-color').value = settings.secondaryColor || '#10b981';
    }
}

// 保存工具
function saveTool() {
    const id = document.getElementById('tool-id').value;
    const name = document.getElementById('tool-name').value;
    const description = document.getElementById('tool-description').value;
    const url = document.getElementById('tool-url').value;
    const icon = document.getElementById('tool-icon').value;
    const category = document.getElementById('tool-category').value;
    const tag = document.getElementById('tool-tag').value;
    
    const tools = loadData(STORAGE_KEYS.TOOLS);
    
    if (id) {
        // 编辑现有工具
        const index = tools.findIndex(tool => tool.id === id);
        if (index !== -1) {
            tools[index] = {
                ...tools[index],
                name,
                description,
                url,
                icon,
                category,
                tag,
                updatedAt: new Date().toISOString()
            };
            
            saveData(STORAGE_KEYS.TOOLS, tools);
            loadTools();
            loadDashboardStats();
            closeAllModals();
            showToast('工具更新成功！');
            
            // 添加活动记录
            addActivity('更新了工具：' + name, 'fa-edit', '#3b82f6');
        }
    } else {
        // 添加新工具
        const newTool = {
            id: `tool_${Date.now()}`,
            name,
            description,
            url,
            icon,
            category,
            tag,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        tools.push(newTool);
        saveData(STORAGE_KEYS.TOOLS, tools);
        loadTools();
        loadDashboardStats();
        closeAllModals();
        showToast('工具添加成功！');
        
        // 添加活动记录
        addActivity('添加了新工具：' + name, 'fa-plus-circle', '#10b981');
    }
}

// 保存分类
function saveCategory() {
    const id = document.getElementById('category-id').value;
    const name = document.getElementById('category-name').value;
    const icon = document.getElementById('category-icon').value;
    
    const categories = loadData(STORAGE_KEYS.CATEGORIES);
    
    if (id) {
        // 编辑现有分类
        const index = categories.findIndex(category => category.id === id);
        if (index !== -1) {
            // 更新分类名称后，同时更新相关工具的分类
            const oldName = categories[index].name;
            categories[index] = {
                ...categories[index],
                name,
                icon
            };
            
            // 更新工具分类
            const tools = loadData(STORAGE_KEYS.TOOLS);
            tools.forEach(tool => {
                if (tool.category === oldName) {
                    tool.category = name;
                    tool.updatedAt = new Date().toISOString();
                }
            });
            
            saveData(STORAGE_KEYS.CATEGORIES, categories);
            saveData(STORAGE_KEYS.TOOLS, tools);
            loadCategories();
            loadTools();
            loadDashboardStats();
            closeAllModals();
            showToast('分类更新成功！');
            
            // 添加活动记录
            addActivity('更新了分类：' + name, 'fa-edit', '#3b82f6');
        }
    } else {
        // 添加新分类
        const newCategory = {
            id: `category_${Date.now()}`,
            name,
            icon,
            color: COLORS[categories.length % COLORS.length],
            sectionId: `section_${Date.now()}`,
            order: categories.length
        };
        
        categories.push(newCategory);
        saveData(STORAGE_KEYS.CATEGORIES, categories);
        loadCategories();
        loadDashboardStats();
        loadCategoriesIntoSelect();
        closeAllModals();
        showToast('分类添加成功！');
        
        // 添加活动记录
        addActivity('添加了新分类：' + name, 'fa-plus-circle', '#10b981');
    }
}

// 编辑工具
function editTool(id) {
    const tools = loadData(STORAGE_KEYS.TOOLS);
    const tool = tools.find(tool => tool.id === id);
    
    if (tool) {
        document.getElementById('modal-title').textContent = '编辑工具';
        document.getElementById('tool-id').value = tool.id;
        document.getElementById('tool-name').value = tool.name;
        document.getElementById('tool-description').value = tool.description;
        document.getElementById('tool-url').value = tool.url;
        document.getElementById('tool-icon').value = tool.icon;
        document.getElementById('tool-tag').value = tool.tag || '';
        previewIcon.className = 'fas ' + tool.icon;
        
        // 加载分类并选中当前分类
        loadCategoriesIntoSelect(tool.category);
        
        openModal(toolModal);
    }
}

// 编辑分类
function editCategory(id) {
    const categories = loadData(STORAGE_KEYS.CATEGORIES);
    const category = categories.find(category => category.id === id);
    
    if (category) {
        document.getElementById('category-modal-title').textContent = '编辑分类';
        document.getElementById('category-id').value = category.id;
        document.getElementById('category-name').value = category.name;
        document.getElementById('category-icon').value = category.icon;
        categoryPreviewIcon.className = 'fas ' + category.icon;
        
        openModal(categoryModal);
    }
}

// 显示确认删除模态框
function showConfirmModal(id, type) {
    const confirmMessage = document.getElementById('confirm-message');
    
    if (type === 'tool') {
        const tools = loadData(STORAGE_KEYS.TOOLS);
        const tool = tools.find(tool => tool.id === id);
        if (tool) {
            confirmMessage.textContent = `你确定要删除工具 "${tool.name}" 吗？此操作不可撤销。`;
        }
    } else if (type === 'category') {
        const categories = loadData(STORAGE_KEYS.CATEGORIES);
        const category = categories.find(category => category.id === id);
        if (category) {
            // 检查是否有工具使用该分类
            const tools = loadData(STORAGE_KEYS.TOOLS);
            const toolsInCategory = tools.filter(tool => tool.category === category.name);
            
            if (toolsInCategory.length > 0) {
                confirmMessage.textContent = `你确定要删除分类 "${category.name}" 吗？该分类下有 ${toolsInCategory.length} 个工具，此操作不可撤销。`;
            } else {
                confirmMessage.textContent = `你确定要删除分类 "${category.name}" 吗？此操作不可撤销。`;
            }
        }
    }
    
    // 保存要删除的ID和类型
    confirmDeleteBtn.setAttribute('data-id', id);
    confirmDeleteBtn.setAttribute('data-type', type);
    
    openModal(confirmModal);
}

// 执行删除操作
function performDelete() {
    const id = confirmDeleteBtn.getAttribute('data-id');
    const type = confirmDeleteBtn.getAttribute('data-type');
    
    if (type === 'tool') {
        const tools = loadData(STORAGE_KEYS.TOOLS);
        const toolIndex = tools.findIndex(tool => tool.id === id);
        
        if (toolIndex !== -1) {
            const toolName = tools[toolIndex].name;
            tools.splice(toolIndex, 1);
            saveData(STORAGE_KEYS.TOOLS, tools);
            loadTools();
            loadDashboardStats();
            closeAllModals();
            showToast('工具删除成功！');
            
            // 添加活动记录
            addActivity('删除了工具：' + toolName, 'fa-trash-alt', '#ef4444');
        }
    } else if (type === 'category') {
        const categories = loadData(STORAGE_KEYS.CATEGORIES);
        const categoryIndex = categories.findIndex(category => category.id === id);
        
        if (categoryIndex !== -1) {
            const categoryName = categories[categoryIndex].name;
            categories.splice(categoryIndex, 1);
            saveData(STORAGE_KEYS.CATEGORIES, categories);
            
            // 将该分类下的工具移动到"其他"分类
            const tools = loadData(STORAGE_KEYS.TOOLS);
            tools.forEach(tool => {
                if (tool.category === categoryName) {
                    tool.category = '其他';
                    tool.updatedAt = new Date().toISOString();
                }
            });
            saveData(STORAGE_KEYS.TOOLS, tools);
            
            loadCategories();
            loadTools();
            loadDashboardStats();
            loadCategoriesIntoSelect();
            closeAllModals();
            showToast('分类删除成功！');
            
            // 添加活动记录
            addActivity('删除了分类：' + categoryName, 'fa-trash-alt', '#ef4444');
        }
    }
}

// 搜索工具
function searchTools() {
    const searchTerm = toolSearchInput.value.toLowerCase().trim();
    filterTools(searchTerm);
}

// 筛选工具
function filterTools(searchTerm = null) {
    const term = searchTerm !== null ? searchTerm : toolSearchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const tools = loadData(STORAGE_KEYS.TOOLS);
    
    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(term) || 
                           tool.description.toLowerCase().includes(term);
        const matchesCategory = category === 'all' || tool.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    toolsTableBody.innerHTML = '';
    
    if (filteredTools.length === 0) {
        toolsTableBody.innerHTML = '<tr class="no-data"><td colspan="7">未找到匹配的工具</td></tr>';
        return;
    }
    
    filteredTools.forEach(tool => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tool.id.substring(0, 8)}</td>
            <td>${tool.name}</td>
            <td><i class="fas ${tool.icon}"></i></td>
            <td>${tool.category}</td>
            <td>${tool.description.substring(0, 50)}${tool.description.length > 50 ? '...' : ''}</td>
            <td><a href="${tool.url}" target="_blank">${tool.url.substring(0, 30)}${tool.url.length > 30 ? '...' : ''}</a></td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" data-id="${tool.id}">编辑</button>
                    <button class="delete-btn" data-id="${tool.id}" data-type="tool">删除</button>
                </div>
            </td>
        `;
        toolsTableBody.appendChild(row);
    });
    
    // 添加编辑和删除事件
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => editTool(btn.getAttribute('data-id')));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showConfirmModal(btn.getAttribute('data-id'), btn.getAttribute('data-type'));
        });
    });
}

// 加载分类到下拉选择框
function loadCategoriesIntoSelect(selectedCategory = null) {
    const categories = loadData(STORAGE_KEYS.CATEGORIES);
    const selectElement = document.getElementById('tool-category');
    
    // 清空现有选项
    selectElement.innerHTML = '';
    
    // 添加全部分类选项（只在筛选下拉框中使用）
    if (selectElement.id === 'category-filter') {
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = '全部分类';
        selectElement.appendChild(allOption);
    }
    
    // 添加分类选项
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        selectElement.appendChild(option);
    });
    
    // 选中指定分类
    if (selectedCategory) {
        selectElement.value = selectedCategory;
    }
}

// 获取分类下的工具数量
function getToolsCountByCategory(categoryName) {
    const tools = loadData(STORAGE_KEYS.TOOLS);
    return tools.filter(tool => tool.category === categoryName).length;
}

// 添加活动记录
function addActivity(text, icon, color) {
    const activities = loadData(STORAGE_KEYS.ACTIVITIES);
    
    const newActivity = {
        id: `activity_${Date.now()}`,
        text,
        icon,
        color,
        timestamp: new Date().toISOString()
    };
    
    activities.push(newActivity);
    
    // 只保留最近50条活动记录
    if (activities.length > 50) {
        activities.splice(0, activities.length - 50);
    }
    
    saveData(STORAGE_KEYS.ACTIVITIES, activities);
    loadActivities();
}

// 保存通用设置
function saveGeneralSettings() {
    const siteTitle = document.getElementById('site-title').value;
    const siteDescription = document.getElementById('site-description').value;
    const adminPassword = document.getElementById('admin-password').value;
    
    const settings = loadData(STORAGE_KEYS.SETTINGS);
    
    const updatedSettings = {
        ...settings,
        siteTitle,
        siteDescription
    };
    
    // 只有当密码不为空时才更新
    if (adminPassword) {
        updatedSettings.adminPassword = adminPassword;
    }
    
    saveData(STORAGE_KEYS.SETTINGS, updatedSettings);
    showToast('设置保存成功！');
    
    // 添加活动记录
    addActivity('更新了通用设置', 'fa-cog', '#8b5cf6');
}

// 保存主题设置
function saveThemeSettings() {
    const primaryColor = document.getElementById('primary-color').value;
    const secondaryColor = document.getElementById('secondary-color').value;
    
    const settings = loadData(STORAGE_KEYS.SETTINGS);
    
    const updatedSettings = {
        ...settings,
        primaryColor,
        secondaryColor
    };
    
    saveData(STORAGE_KEYS.SETTINGS, updatedSettings);
    showToast('主题设置已应用！');
    
    // 添加活动记录
    addActivity('更新了主题设置', 'fa-paint-brush', '#ec4899');
}

// 备份数据
function backupData() {
    const tools = loadData(STORAGE_KEYS.TOOLS);
    const categories = loadData(STORAGE_KEYS.CATEGORIES);
    const settings = loadData(STORAGE_KEYS.SETTINGS);
    
    const backupData = {
        tools,
        categories,
        settings,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `ai_tools_backup_${formatDateForFilename(new Date())}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('数据备份成功！');
    
    // 添加活动记录
    addActivity('创建了数据备份', 'fa-download', '#10b981');
}

// 恢复数据
function restoreData() {
    const file = restoreFileInput.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            
            if (backupData.tools) {
                saveData(STORAGE_KEYS.TOOLS, backupData.tools);
            }
            
            if (backupData.categories) {
                saveData(STORAGE_KEYS.CATEGORIES, backupData.categories);
            }
            
            if (backupData.settings) {
                saveData(STORAGE_KEYS.SETTINGS, backupData.settings);
            }
            
            // 重新加载所有数据
            loadTools();
            loadCategories();
            loadDashboardStats();
            loadActivities();
            loadSettings();
            loadCategoriesIntoSelect();
            
            showToast('数据恢复成功！');
            
            // 添加活动记录
            addActivity('从备份恢复了数据', 'fa-upload', '#3b82f6');
        } catch (error) {
            showToast('数据恢复失败：无效的备份文件', 'error');
        }
    };
    
    reader.readAsText(file);
    
    // 重置文件输入
    restoreFileInput.value = '';
}

// 更新工具图标预览
function updateToolIconPreview() {
    const iconClass = toolIconInput.value.trim();
    previewIcon.className = `fas ${iconClass}`;
}

// 更新分类图标预览
function updateCategoryIconPreview() {
    const iconClass = categoryIconInput.value.trim();
    categoryPreviewIcon.className = `fas ${iconClass}`;
}

// 显示提示消息
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.classList.add('show');
    
    // 根据类型设置不同的背景色
    if (type === 'error') {
        toast.style.backgroundColor = '#ef4444';
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#f59e0b';
    } else {
        toast.style.backgroundColor = '#10b981';
    }
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// 格式化日期时间
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 格式化文件名日期
function formatDateForFilename(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// 当页面加载完成后初始化应用
window.addEventListener('load', initApp);