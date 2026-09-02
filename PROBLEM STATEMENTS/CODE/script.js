// ============================================
// SKILLSPHERE - MAIN JAVASCRIPT
// Student Skill Development Management System
// ============================================

// ============================================
// DATA MANAGEMENT & LOCALSTORAGE
// ============================================

const DataManager = {
    // Get all data from LocalStorage
    getAllData() {
        return {
            studentProfile: this.getStudentProfile(),
            skills: this.getSkills(),
            assessments: this.getAssessments(),
            certifications: this.getCertifications(),
            projects: this.getProjects(),
            mentorFeedback: this.getMentorFeedback(),
            activities: this.getActivities(),
            learningPlan: this.getLearningPlan()
        };
    },

    // Student Profile
    getStudentProfile() {
        const profile = localStorage.getItem('studentProfile');
        return profile ? JSON.parse(profile) : {
            fullName: '',
            registerNumber: '',
            email: '',
            department: '',
            year: '',
            college: '',
            careerGoal: '',
            linkedinUrl: '',
            githubUrl: '',
            avatarColor: '#6366F1'
        };
    },

    saveStudentProfile(profile) {
        localStorage.setItem('studentProfile', JSON.stringify(profile));
        this.addActivity(`Updated profile information`);
    },

    // Skills
    getSkills() {
        const skills = localStorage.getItem('skills');
        return skills ? JSON.parse(skills) : [];
    },

    saveSkills(skills) {
        localStorage.setItem('skills', JSON.stringify(skills));
    },

    addSkill(skill) {
        const skills = this.getSkills();
        skill.id = Date.now();
        skill.createdAt = new Date().toISOString();
        skills.push(skill);
        this.saveSkills(skills);
        this.addActivity(`Added skill: ${skill.name}`);
        return skill;
    },

    updateSkill(skillId, updatedSkill) {
        const skills = this.getSkills();
        const index = skills.findIndex(s => s.id === skillId);
        if (index !== -1) {
            skills[index] = { ...skills[index], ...updatedSkill };
            this.saveSkills(skills);
            this.addActivity(`Updated skill: ${skills[index].name}`);
        }
    },

    deleteSkill(skillId) {
        const skills = this.getSkills();
        const skill = skills.find(s => s.id === skillId);
        const filteredSkills = skills.filter(s => s.id !== skillId);
        this.saveSkills(filteredSkills);
        if (skill) {
            this.addActivity(`Deleted skill: ${skill.name}`);
        }
    },

    // Assessments
    getAssessments() {
        const assessments = localStorage.getItem('assessments');
        return assessments ? JSON.parse(assessments) : [];
    },

    saveAssessments(assessments) {
        localStorage.setItem('assessments', JSON.stringify(assessments));
    },

    addAssessment(assessment) {
        const assessments = this.getAssessments();
        assessment.id = Date.now();
        assessment.date = new Date().toISOString();
        assessments.push(assessment);
        this.saveAssessments(assessments);
        this.addActivity(`Completed assessment for a skill with score: ${assessment.score}%`);
        return assessment;
    },

    // Certifications
    getCertifications() {
        const certifications = localStorage.getItem('certifications');
        return certifications ? JSON.parse(certifications) : [];
    },

    saveCertifications(certifications) {
        localStorage.setItem('certifications', JSON.stringify(certifications));
    },

    addCertification(certification) {
        const certifications = this.getCertifications();
        certification.id = Date.now();
        certification.addedAt = new Date().toISOString();
        certifications.push(certification);
        this.saveCertifications(certifications);
        this.addActivity(`Added certification: ${certification.name}`);
        return certification;
    },

    deleteCertification(certId) {
        const certifications = this.getCertifications();
        const cert = certifications.find(c => c.id === certId);
        const filteredCerts = certifications.filter(c => c.id !== certId);
        this.saveCertifications(filteredCerts);
        if (cert) {
            this.addActivity(`Removed certification: ${cert.name}`);
        }
    },

    // Projects
    getProjects() {
        const projects = localStorage.getItem('projects');
        return projects ? JSON.parse(projects) : [];
    },

    saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    },

    addProject(project) {
        const projects = this.getProjects();
        project.id = Date.now();
        project.createdAt = new Date().toISOString();
        projects.push(project);
        this.saveProjects(projects);
        this.addActivity(`Added project: ${project.title}`);
        return project;
    },

    updateProject(projectId, updatedProject) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedProject };
            this.saveProjects(projects);
        }
    },

    deleteProject(projectId) {
        const projects = this.getProjects();
        const project = projects.find(p => p.id === projectId);
        const filteredProjects = projects.filter(p => p.id !== projectId);
        this.saveProjects(filteredProjects);
        if (project) {
            this.addActivity(`Removed project: ${project.title}`);
        }
    },

    // Mentor Feedback
    getMentorFeedback() {
        const feedback = localStorage.getItem('mentorFeedback');
        return feedback ? JSON.parse(feedback) : [];
    },

    saveMentorFeedback(feedback) {
        localStorage.setItem('mentorFeedback', JSON.stringify(feedback));
    },

    addMentorFeedback(feedback) {
        const feedbackList = this.getMentorFeedback();
        feedback.id = Date.now();
        feedback.date = new Date().toISOString();
        feedbackList.push(feedback);
        this.saveMentorFeedback(feedbackList);
        this.addActivity(`Received feedback from mentor`);
        return feedback;
    },

    deleteMentorFeedback(feedbackId) {
        const feedbackList = this.getMentorFeedback();
        const filteredFeedback = feedbackList.filter(f => f.id !== feedbackId);
        this.saveMentorFeedback(filteredFeedback);
    },

    // Activities
    getActivities() {
        const activities = localStorage.getItem('activities');
        return activities ? JSON.parse(activities) : [];
    },

    saveActivities(activities) {
        localStorage.setItem('activities', JSON.stringify(activities));
    },

    addActivity(description) {
        const activities = this.getActivities();
        activities.unshift({
            id: Date.now(),
            description: description,
            timestamp: new Date().toISOString()
        });
        // Keep only last 50 activities
        if (activities.length > 50) {
            activities.pop();
        }
        this.saveActivities(activities);
    },

    // Learning Plan
    getLearningPlan() {
        const plan = localStorage.getItem('learningPlan');
        return plan ? JSON.parse(plan) : [];
    },

    saveLearningPlan(plan) {
        localStorage.setItem('learningPlan', JSON.stringify(plan));
    },

    // Export & Import
    exportData() {
        return JSON.stringify(this.getAllData(), null, 2);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.studentProfile) localStorage.setItem('studentProfile', JSON.stringify(data.studentProfile));
            if (data.skills) localStorage.setItem('skills', JSON.stringify(data.skills));
            if (data.assessments) localStorage.setItem('assessments', JSON.stringify(data.assessments));
            if (data.certifications) localStorage.setItem('certifications', JSON.stringify(data.certifications));
            if (data.projects) localStorage.setItem('projects', JSON.stringify(data.projects));
            if (data.mentorFeedback) localStorage.setItem('mentorFeedback', JSON.stringify(data.mentorFeedback));
            if (data.activities) localStorage.setItem('activities', JSON.stringify(data.activities));
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    },

    clearAllData() {
        localStorage.clear();
        this.initializeSampleData();
    },

    // Initialize with sample data
    initializeSampleData() {
        const profile = this.getStudentProfile();
        if (!profile.fullName) {
            const sampleProfile = {
                fullName: 'John Developer',
                registerNumber: 'CSE-2024-001',
                email: 'john@college.edu',
                department: 'Computer Science',
                year: '3rd Year',
                college: 'Tech Institute',
                careerGoal: 'Full-Stack Developer',
                linkedinUrl: 'https://linkedin.com',
                githubUrl: 'https://github.com',
                avatarColor: '#6366F1'
            };
            this.saveStudentProfile(sampleProfile);
        }

        const skills = this.getSkills();
        if (skills.length === 0) {
            const sampleSkills = [
                { name: 'Python', category: 'Programming', progress: 85, id: 1 },
                { name: 'HTML/CSS', category: 'Web Development', progress: 75, id: 2 },
                { name: 'JavaScript', category: 'Web Development', progress: 60, id: 3 },
                { name: 'SQL', category: 'Database', progress: 45, id: 4 },
                { name: 'Machine Learning', category: 'Artificial Intelligence', progress: 30, id: 5 }
            ];
            sampleSkills.forEach(skill => {
                skill.id = Date.now() + Math.random();
                this.addSkill(skill);
            });
        }
    }
};

// ============================================
// ANALYTICS & CALCULATIONS
// ============================================

const Analytics = {
    // Calculate overall skill score
    getOverallSkillScore() {
        const skills = DataManager.getSkills();
        if (skills.length === 0) return 0;
        const total = skills.reduce((sum, skill) => sum + skill.progress, 0);
        return Math.round(total / skills.length);
    },

    // Calculate overall learning progress
    getOverallProgress() {
        return this.getOverallSkillScore();
    },

    // Calculate competency distribution
    getCompetencyDistribution() {
        const skills = DataManager.getSkills();
        return {
            advanced: skills.filter(s => s.progress >= 70).length,
            intermediate: skills.filter(s => s.progress >= 40 && s.progress < 70).length,
            beginner: skills.filter(s => s.progress < 40).length
        };
    },

    // Get competency level for a score
    getCompetencyLevel(progress) {
        if (progress >= 70) return 'Advanced';
        if (progress >= 50) return 'Intermediate';
        return 'Beginner';
    },

    // Calculate employability score
    getEmployabilityScore() {
        const skills = DataManager.getSkills();
        const certifications = DataManager.getCertifications();
        const projects = DataManager.getProjects();
        const assessments = DataManager.getAssessments();

        let score = 0;

        // 50% from skill progress
        if (skills.length > 0) {
            const avgProgress = skills.reduce((sum, s) => sum + s.progress, 0) / skills.length;
            score += avgProgress * 0.5;
        }

        // 20% from certifications
        score += Math.min(certifications.length * 10, 20);

        // 20% from projects
        score += Math.min(projects.length * 10, 20);

        // 10% from assessments
        if (assessments.length > 0) {
            const avgAssessmentScore = assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length;
            score += (avgAssessmentScore / 100) * 10;
        }

        return Math.round(score);
    },

    // Get competency gap analysis
    getCompetencyGapAnalysis() {
        const skills = DataManager.getSkills();
        return {
            strong: skills.filter(s => s.progress >= 70).map(s => s.name),
            moderate: skills.filter(s => s.progress >= 40 && s.progress < 70).map(s => s.name),
            high: skills.filter(s => s.progress < 40).map(s => s.name)
        };
    },

    // Generate learning recommendations
    generateLearningPlan() {
        const skills = DataManager.getSkills();
        const recommendations = [];

        skills.forEach(skill => {
            if (skill.progress < 40) {
                recommendations.push({
                    id: Date.now() + Math.random(),
                    skillId: skill.id,
                    skillName: skill.name,
                    type: 'Beginner Fundamentals',
                    priority: 'High',
                    description: `Learn the fundamentals of ${skill.name} through tutorials and practice`,
                    completed: false
                });
            } else if (skill.progress >= 40 && skill.progress < 70) {
                recommendations.push({
                    id: Date.now() + Math.random(),
                    skillId: skill.id,
                    skillName: skill.name,
                    type: 'Practice Projects',
                    priority: 'Medium',
                    description: `Build mini-projects to strengthen your ${skill.name} skills`,
                    completed: false
                });
            } else {
                recommendations.push({
                    id: Date.now() + Math.random(),
                    skillId: skill.id,
                    skillName: skill.name,
                    type: 'Advanced Topics',
                    priority: 'Low',
                    description: `Explore advanced topics and specializations in ${skill.name}`,
                    completed: false
                });
            }
        });

        DataManager.saveLearningPlan(recommendations);
        return recommendations;
    }
};

// ============================================
// UI MANAGEMENT
// ============================================

const UIManager = {
    // Toast Notifications
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Page Navigation
    navigateTo(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeNav = document.querySelector(`[data-page="${pageName}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        // Close sidebar on mobile
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }

        // Call page-specific initialization
        this.initializePage(pageName);
    },

    // Initialize page-specific content
    initializePage(pageName) {
        switch(pageName) {
            case 'dashboard':
                DashboardManager.updateDashboard();
                break;
            case 'profile':
                ProfileManager.loadProfile();
                break;
            case 'skills':
                SkillsManager.displaySkills();
                break;
            case 'assessments':
                AssessmentsManager.displayAssessments();
                break;
            case 'certifications':
                CertificationsManager.displayCertifications();
                break;
            case 'projects':
                ProjectsManager.displayProjects();
                break;
            case 'learning-plan':
                LearningPlanManager.displayLearningPlan();
                break;
            case 'progress':
                ProgressManager.displayProgress();
                break;
            case 'mentor-feedback':
                MentorFeedbackManager.displayFeedback();
                break;
            case 'analytics':
                AnalyticsManager.displayAnalytics();
                break;
            case 'settings':
                SettingsManager.initializeSettings();
                break;
        }
    },

    // Update greeting based on time
    updateGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Morning';
        if (hour >= 12 && hour < 18) greeting = 'Good Afternoon';
        if (hour >= 18) greeting = 'Good Evening';

        const profile = DataManager.getStudentProfile();
        const name = profile.fullName ? profile.fullName.split(' ')[0] : 'Student';
        
        document.getElementById('greeting').textContent = `${greeting}, ${name}`;
        document.getElementById('welcomeName').textContent = `Welcome, ${name}!`;
        document.getElementById('topbarName').textContent = name;
    },

    // Update motivational quote
    updateMotivationalQuote() {
        const quotes = [
            'Every expert was once a beginner.',
            'The only way to do great work is to love what you do.',
            'Success is not final, failure is not fatal.',
            'Your education is a dress rehearsal for a life that is yours to lead.',
            'Learning never exhausts the mind.',
            'An investment in knowledge pays the best interest.',
            'The expert in anything was once a beginner.'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('welcomeQuote').textContent = randomQuote;
    },

    // Animate circular progress
    animateCircularProgress(element, value) {
        const circles = element.querySelectorAll('circle');
        if (circles.length < 2) return;

        const circle = circles[1];
        const circumference = 2 * Math.PI * 45;
        const offset = circumference * (1 - value / 100);
        
        circle.style.strokeDashoffset = offset;
    },

    // Animate progress bar
    animateProgressBar(element, value) {
        element.style.width = value + '%';
    }
};

// ============================================
// DASHBOARD MANAGER
// ============================================

const DashboardManager = {
    updateDashboard() {
        this.updateStats();
        this.updateActivities();
        this.updateRecommendations();
        this.updateProgressBar();
        this.updateCompetencyBadges();
    },

    updateStats() {
        const skills = DataManager.getSkills();
        const certifications = DataManager.getCertifications();
        const projects = DataManager.getProjects();

        document.getElementById('dashSkillCount').textContent = skills.length;
        document.getElementById('dashCertCount').textContent = certifications.length;
        document.getElementById('dashProjectCount').textContent = projects.length;

        // Overall score
        const overallScore = Analytics.getOverallSkillScore();
        document.getElementById('overallScore').textContent = overallScore;
        UIManager.animateCircularProgress(document.getElementById('overallScoreCircle'), overallScore);

        // Learning progress
        const progress = Analytics.getOverallProgress();
        UIManager.animateProgressBar(document.getElementById('learningProgressBar'), progress);
        document.getElementById('learningProgressText').textContent = progress + '%';

        if (progress < 40) {
            document.getElementById('progressDescription').textContent = 'Keep learning! You\'re just getting started.';
        } else if (progress < 70) {
            document.getElementById('progressDescription').textContent = 'Great progress! Keep going.';
        } else {
            document.getElementById('progressDescription').textContent = 'Excellent! You\'re making great strides.';
        }
    },

    updateCompetencyBadges() {
        const distribution = Analytics.getCompetencyDistribution();
        document.getElementById('badgeAdvanced').textContent = `Advanced: ${distribution.advanced}`;
        document.getElementById('badgeIntermediate').textContent = `Intermediate: ${distribution.intermediate}`;
        document.getElementById('badgeBeginner').textContent = `Beginner: ${distribution.beginner}`;
    },

    updateActivities() {
        const activities = DataManager.getActivities();
        const timeline = document.getElementById('activitiesTimeline');
        timeline.innerHTML = '';

        if (activities.length === 0) {
            timeline.innerHTML = '<p class="empty-state">No recent activities yet. Start by adding a skill!</p>';
            return;
        }

        activities.slice(0, 5).forEach(activity => {
            const date = new Date(activity.timestamp);
            const timeAgo = this.getTimeAgo(date);
            
            const activityEl = document.createElement('div');
            activityEl.className = 'activity-item';
            activityEl.innerHTML = `
                <div class="activity-time">${timeAgo}</div>
                <div class="activity-text">${activity.description}</div>
            `;
            timeline.appendChild(activityEl);
        });
    },

    updateRecommendations() {
        const recommendations = Analytics.generateLearningPlan();
        const list = document.getElementById('recommendationsList');
        list.innerHTML = '';

        if (recommendations.length === 0) {
            list.innerHTML = '<p class="empty-state">Recommendations will appear once you add skills.</p>';
            return;
        }

        recommendations.slice(0, 4).forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <span class="recommendation-priority ${rec.priority.toLowerCase()}">${rec.priority}</span>
                <div class="recommendation-title">${rec.type}</div>
                <div class="recommendation-description">${rec.description}</div>
            `;
            list.appendChild(card);
        });
    },

    updateProgressBar() {
        const progress = Analytics.getOverallProgress();
        UIManager.animateProgressBar(document.getElementById('learningProgressBar'), progress);
    },

    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    }
};

// ============================================
// PROFILE MANAGER
// ============================================

const ProfileManager = {
    loadProfile() {
        const profile = DataManager.getStudentProfile();
        
        document.getElementById('fullName').value = profile.fullName || '';
        document.getElementById('registerNumber').value = profile.registerNumber || '';
        document.getElementById('email').value = profile.email || '';
        document.getElementById('department').value = profile.department || '';
        document.getElementById('year').value = profile.year || '';
        document.getElementById('college').value = profile.college || '';
        document.getElementById('careerGoal').value = profile.careerGoal || '';
        document.getElementById('linkedinUrl').value = profile.linkedinUrl || '';
        document.getElementById('githubUrl').value = profile.githubUrl || '';

        this.updateAvatar();
        this.updateCompletion();
    },

    updateCompletion() {
        const fields = ['fullName', 'registerNumber', 'email', 'department', 'year', 'college', 'careerGoal', 'linkedinUrl', 'githubUrl'];
        let completed = 0;

        fields.forEach(field => {
            if (document.getElementById(field).value.trim()) {
                completed++;
            }
        });

        const percentage = Math.round((completed / fields.length) * 100);
        document.getElementById('completionPercent').textContent = percentage;
        UIManager.animateProgressBar(document.getElementById('completionFill'), percentage);
    },

    saveProfile() {
        const profile = {
            fullName: document.getElementById('fullName').value,
            registerNumber: document.getElementById('registerNumber').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            year: document.getElementById('year').value,
            college: document.getElementById('college').value,
            careerGoal: document.getElementById('careerGoal').value,
            linkedinUrl: document.getElementById('linkedinUrl').value,
            githubUrl: document.getElementById('githubUrl').value,
            avatarColor: DataManager.getStudentProfile().avatarColor
        };

        DataManager.saveStudentProfile(profile);
        UIManager.showToast('Profile saved successfully!', 'success');
        UIManager.updateGreeting();
        this.updateAvatar();
    },

    updateAvatar() {
        const profile = DataManager.getStudentProfile();
        const initial = profile.fullName.charAt(0).toUpperCase() || 'S';
        const color = profile.avatarColor || '#6366F1';

        const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='${color}'/><text x='50' y='65' font-size='50' fill='white' text-anchor='middle' font-family='Arial'>${initial}</text></svg>`;
        const dataUrl = 'data:image/svg+xml,' + encodeURIComponent(svg);

        document.getElementById('profileAvatar').src = dataUrl;
        document.getElementById('topbarAvatar').src = dataUrl;
    }
};

// ============================================
// SKILLS MANAGER
// ============================================

const SkillsManager = {
    displaySkills() {
        const skills = DataManager.getSkills();
        const grid = document.getElementById('skillsGrid');
        const searchTerm = (document.getElementById('skillsSearchInput')?.value || '').toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter')?.value || '';

        let filteredSkills = skills;

        if (searchTerm) {
            filteredSkills = filteredSkills.filter(s => 
                s.name.toLowerCase().includes(searchTerm)
            );
        }

        if (categoryFilter) {
            filteredSkills = filteredSkills.filter(s => s.category === categoryFilter);
        }

        grid.innerHTML = '';

        if (filteredSkills.length === 0) {
            grid.innerHTML = '<p class="empty-state">No skills found. Try adding a new skill!</p>';
            return;
        }

        filteredSkills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            
            const competency = Analytics.getCompetencyLevel(skill.progress);

            card.innerHTML = `
                <div class="skill-header">
                    <div>
                        <div class="skill-name">${skill.name}</div>
                        <span class="skill-category">${skill.category}</span>
                    </div>
                    <div class="skill-actions">
                        <button class="skill-action-btn edit-skill-btn" data-id="${skill.id}" title="Edit">✏️</button>
                        <button class="skill-action-btn delete-skill-btn" data-id="${skill.id}" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-bar">
                        <div class="skill-progress-fill" style="width: ${skill.progress}%"></div>
                    </div>
                    <div class="skill-progress-text">
                        <span>Progress</span>
                        <span>${skill.progress}%</span>
                    </div>
                </div>
                <div class="skill-competency ${competency.toLowerCase()}">${competency}</div>
            `;

            grid.appendChild(card);
        });

        // Add event listeners
        document.querySelectorAll('.edit-skill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const skillId = parseInt(e.currentTarget.dataset.id);
                this.openEditSkillForm(skillId);
            });
        });

        document.querySelectorAll('.delete-skill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const skillId = parseInt(e.currentTarget.dataset.id);
                if (confirm('Are you sure you want to delete this skill?')) {
                    DataManager.deleteSkill(skillId);
                    UIManager.showToast('Skill deleted successfully!', 'success');
                    this.displaySkills();
                    DashboardManager.updateDashboard();
                }
            });
        });
    },

    openAddSkillForm() {
        document.getElementById('skillFormTitle').textContent = 'Add New Skill';
        document.getElementById('skillForm').reset();
        document.getElementById('skillFormModal').classList.add('active');
        document.querySelector('#skillForm input[type="text"]').focus();
    },

    openEditSkillForm(skillId) {
        const skills = DataManager.getSkills();
        const skill = skills.find(s => s.id === skillId);
        
        if (skill) {
            document.getElementById('skillFormTitle').textContent = 'Edit Skill';
            document.getElementById('skillName').value = skill.name;
            document.getElementById('skillCategory').value = skill.category;
            document.getElementById('skillProgress').value = skill.progress;
            document.getElementById('progressValue').textContent = skill.progress + '%';
            document.getElementById('skillFormModal').classList.add('active');
            
            // Store skill ID for update
            document.getElementById('skillForm').dataset.skillId = skillId;
        }
    },

    closeSkillForm() {
        document.getElementById('skillFormModal').classList.remove('active');
        delete document.getElementById('skillForm').dataset.skillId;
    },

    saveSkill() {
        const name = document.getElementById('skillName').value.trim();
        const category = document.getElementById('skillCategory').value;
        const progress = parseInt(document.getElementById('skillProgress').value);

        if (!name) {
            UIManager.showToast('Please enter a skill name', 'error');
            return;
        }

        if (!category) {
            UIManager.showToast('Please select a category', 'error');
            return;
        }

        const skillId = document.getElementById('skillForm').dataset.skillId;

        if (skillId) {
            // Update existing skill
            DataManager.updateSkill(parseInt(skillId), { name, category, progress });
            UIManager.showToast('Skill updated successfully!', 'success');
        } else {
            // Add new skill
            DataManager.addSkill({ name, category, progress });
            UIManager.showToast('Skill added successfully!', 'success');
        }

        this.closeSkillForm();
        this.displaySkills();
        DashboardManager.updateDashboard();
    }
};

// ============================================
// ASSESSMENTS MANAGER
// ============================================

const AssessmentsManager = {
    displayAssessments() {
        const skills = DataManager.getSkills();
        const assessments = DataManager.getAssessments();
        
        // Populate skill select
        const select = document.getElementById('assessmentSkillSelect');
        select.innerHTML = '<option value="">Choose a skill...</option>';
        skills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill.id;
            option.textContent = skill.name;
            select.appendChild(option);
        });

        // Display assessments
        const list = document.getElementById('assessmentsList');
        list.innerHTML = '';

        if (assessments.length === 0) {
            list.innerHTML = '<p class="empty-state">No assessments yet. Complete an assessment above!</p>';
            return;
        }

        const sortedAssessments = [...assessments].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        sortedAssessments.forEach(assessment => {
            const skill = skills.find(s => s.id === assessment.skillId);
            const competency = Analytics.getCompetencyLevel(assessment.score);
            const date = new Date(assessment.date).toLocaleDateString();

            const card = document.createElement('div');
            card.className = 'assessment-card';
            card.innerHTML = `
                <div class="assessment-header">
                    <div class="assessment-skill-name">${skill?.name || 'Unknown Skill'}</div>
                    <div class="assessment-score-display">${assessment.score}%</div>
                </div>
                <span class="assessment-competency ${competency.toLowerCase()}">${competency}</span>
                <div class="assessment-date" style="color: var(--text-secondary); font-size: 12px; margin-top: 8px;">
                    ${date}
                </div>
            `;
            list.appendChild(card);
        });
    },

    saveAssessment() {
        const skillId = parseInt(document.getElementById('assessmentSkillSelect').value);
        const score = parseInt(document.getElementById('assessmentScore').value);

        if (!skillId) {
            UIManager.showToast('Please select a skill', 'error');
            return;
        }

        const skill = DataManager.getSkills().find(s => s.id === skillId);
        if (!skill) {
            UIManager.showToast('Skill not found', 'error');
            return;
        }

        // Update skill progress with assessment score
        DataManager.updateSkill(skillId, { progress: score });

        // Add assessment record
        DataManager.addAssessment({ skillId, skillName: skill.name, score });

        UIManager.showToast('Assessment saved successfully!', 'success');
        this.displayAssessments();
        DashboardManager.updateDashboard();

        // Reset form
        document.getElementById('assessmentForm').reset();
        document.getElementById('assessmentScoreValue').textContent = '50%';
        document.getElementById('competencyLevel').textContent = 
            '<span class="level-badge">Intermediate</span>';
    }
};

// ============================================
// CERTIFICATIONS MANAGER
// ============================================

const CertificationsManager = {
    displayCertifications() {
        const certifications = DataManager.getCertifications();
        const grid = document.getElementById('certificationsGrid');
        grid.innerHTML = '';

        if (certifications.length === 0) {
            grid.innerHTML = '<p class="empty-state">No certifications yet. Add your first achievement!</p>';
            return;
        }

        certifications.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'cert-card';
            const date = new Date(cert.date).toLocaleDateString();

            card.innerHTML = `
                <div class="cert-header">
                    <div>
                        <div class="cert-title">${cert.name}</div>
                        <div class="cert-org">${cert.organization}</div>
                    </div>
                </div>
                <div class="cert-date">${date}</div>
                <div class="cert-description">${cert.description || 'No description provided'}</div>
                <div class="cert-actions">
                    ${cert.url ? `<a href="${cert.url}" target="_blank" class="cert-link-btn">View Credential 🔗</a>` : ''}
                    <button class="cert-delete-btn" data-id="${cert.id}" title="Delete">🗑️</button>
                </div>
            `;

            grid.appendChild(card);
        });

        document.querySelectorAll('.cert-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const certId = parseInt(e.currentTarget.dataset.id);
                if (confirm('Are you sure you want to delete this certification?')) {
                    DataManager.deleteCertification(certId);
                    UIManager.showToast('Certification deleted!', 'success');
                    this.displayCertifications();
                    DashboardManager.updateDashboard();
                }
            });
        });
    },

    openAddForm() {
        document.getElementById('certForm').reset();
        document.getElementById('certFormModal').classList.add('active');
    },

    closeForm() {
        document.getElementById('certFormModal').classList.remove('active');
    },

    saveCertification() {
        const name = document.getElementById('certName').value.trim();
        const organization = document.getElementById('certOrganization').value.trim();
        const date = document.getElementById('certDate').value;
        const url = document.getElementById('certUrl').value.trim();
        const description = document.getElementById('certDescription').value.trim();

        if (!name || !organization || !date) {
            UIManager.showToast('Please fill in all required fields', 'error');
            return;
        }

        DataManager.addCertification({
            name,
            organization,
            date,
            url,
            description
        });

        UIManager.showToast('Certification added successfully!', 'success');
        this.closeForm();
        this.displayCertifications();
        DashboardManager.updateDashboard();
    }
};

// ============================================
// PROJECTS MANAGER
// ============================================

const ProjectsManager = {
    displayProjects() {
        const projects = DataManager.getProjects();
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = '';

        if (projects.length === 0) {
            grid.innerHTML = '<p class="empty-state">No projects yet. Start building!</p>';
            return;
        }

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            const technologies = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];

            card.innerHTML = `
                <div class="project-header">
                    <div class="project-title">${project.title}</div>
                    <span class="project-status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <div class="project-description">${project.description || 'No description'}</div>
                <div class="project-technologies">
                    ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-btn">View on GitHub 🔗</a>` : ''}
                    <button class="project-btn edit-project-btn" data-id="${project.id}">Edit ✏️</button>
                    <button class="project-btn" style="background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); color: var(--accent-error);" data-id="${project.id}">Delete 🗑️</button>
                </div>
            `;

            grid.appendChild(card);
        });

        // Add event listeners
        document.querySelectorAll('.edit-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = parseInt(e.currentTarget.dataset.id);
                this.openEditForm(projectId);
            });
        });

        document.querySelectorAll('[data-id]').forEach(btn => {
            if (btn.textContent.includes('Delete')) {
                btn.addEventListener('click', (e) => {
                    const projectId = parseInt(e.currentTarget.dataset.id);
                    if (confirm('Are you sure you want to delete this project?')) {
                        DataManager.deleteProject(projectId);
                        UIManager.showToast('Project deleted!', 'success');
                        this.displayProjects();
                        DashboardManager.updateDashboard();
                    }
                });
            }
        });
    },

    openAddForm() {
        document.getElementById('projectFormTitle').textContent = 'Add New Project';
        document.getElementById('projectForm').reset();
        document.getElementById('projectFormModal').classList.add('active');
        delete document.getElementById('projectForm').dataset.projectId;
    },

    openEditForm(projectId) {
        const projects = DataManager.getProjects();
        const project = projects.find(p => p.id === projectId);

        if (project) {
            document.getElementById('projectFormTitle').textContent = 'Edit Project';
            document.getElementById('projectTitle').value = project.title;
            document.getElementById('projectDescription').value = project.description;
            document.getElementById('projectTechnologies').value = project.technologies;
            document.getElementById('projectStatus').value = project.status;
            document.getElementById('projectGitHub').value = project.github || '';
            document.getElementById('projectFormModal').classList.add('active');
            document.getElementById('projectForm').dataset.projectId = projectId;
        }
    },

    closeForm() {
        document.getElementById('projectFormModal').classList.remove('active');
        delete document.getElementById('projectForm').dataset.projectId;
    },

    saveProject() {
        const title = document.getElementById('projectTitle').value.trim();
        const description = document.getElementById('projectDescription').value.trim();
        const technologies = document.getElementById('projectTechnologies').value.trim();
        const status = document.getElementById('projectStatus').value;
        const github = document.getElementById('projectGitHub').value.trim();

        if (!title) {
            UIManager.showToast('Please enter a project title', 'error');
            return;
        }

        const projectId = document.getElementById('projectForm').dataset.projectId;

        if (projectId) {
            DataManager.updateProject(parseInt(projectId), {
                title, description, technologies, status, github
            });
            UIManager.showToast('Project updated successfully!', 'success');
        } else {
            DataManager.addProject({
                title, description, technologies, status, github
            });
            UIManager.showToast('Project added successfully!', 'success');
        }

        this.closeForm();
        this.displayProjects();
        DashboardManager.updateDashboard();
    }
};

// ============================================
// LEARNING PLAN MANAGER
// ============================================

const LearningPlanManager = {
    displayLearningPlan() {
        const recommendations = Analytics.generateLearningPlan();
        const container = document.getElementById('learningRecommendations');
        container.innerHTML = '';

        if (recommendations.length === 0) {
            container.innerHTML = '<p class="empty-state">Add skills and complete assessments to get personalized learning recommendations.</p>';
            return;
        }

        recommendations.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = 'learning-roadmap-card';
            card.style.animationDelay = (index * 0.1) + 's';

            card.innerHTML = `
                <span class="roadmap-priority ${rec.priority.toLowerCase()}">${rec.priority} Priority</span>
                <div class="roadmap-title">${rec.type}</div>
                <div class="roadmap-description">${rec.description}</div>
                <div class="roadmap-actions">
                    <button class="roadmap-btn mark-complete-btn" data-id="${rec.id}">✓ Mark as Completed</button>
                </div>
            `;

            container.appendChild(card);
        });

        document.querySelectorAll('.mark-complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                UIManager.showToast('Great job! Keep up the learning!', 'success');
                btn.parentElement.parentElement.style.opacity = '0.6';
                btn.disabled = true;
            });
        });
    }
};

// ============================================
// PROGRESS MANAGER
// ============================================

const ProgressManager = {
    displayProgress() {
        const progress = Analytics.getOverallProgress();
        
        // Update overall progress circle
        document.getElementById('overallProgressValue').textContent = progress;
        UIManager.animateCircularProgress(document.getElementById('overallProgressCircle'), progress);

        // Update milestones
        const skills = DataManager.getSkills();
        const certifications = DataManager.getCertifications();
        const assessments = DataManager.getAssessments();

        const milestones = document.querySelectorAll('.milestone');
        if (skills.length > 0) milestones[0].classList.add('achieved');
        if (assessments.length > 0) milestones[1].classList.add('achieved');
        if (certifications.length > 0) milestones[2].classList.add('achieved');

        // Display skill-wise progress
        this.displaySkillProgress(skills);
    },

    displaySkillProgress(skills) {
        const list = document.getElementById('skillProgressList');
        list.innerHTML = '';

        if (skills.length === 0) {
            list.innerHTML = '<p class="empty-state">No skills to track yet.</p>';
            return;
        }

        skills.forEach((skill, index) => {
            const item = document.createElement('div');
            item.className = 'skill-progress-item';
            item.style.animationDelay = (index * 0.1) + 's';

            item.innerHTML = `
                <div class="skill-progress-name">${skill.name}</div>
                <div class="skill-progress-bar-container">
                    <div class="skill-progress-bar-fill">
                        <div class="progress-fill" style="width: ${skill.progress}%"></div>
                    </div>
                    <span class="skill-progress-percent">${skill.progress}%</span>
                </div>
            `;

            list.appendChild(item);
        });
    }
};

// ============================================
// MENTOR FEEDBACK MANAGER
// ============================================

const MentorFeedbackManager = {
    displayFeedback() {
        const feedback = DataManager.getMentorFeedback();
        const timeline = document.getElementById('feedbackTimeline');
        timeline.innerHTML = '';

        if (feedback.length === 0) {
            timeline.innerHTML = '<p class="empty-state">No feedback yet. Let your mentors guide your growth!</p>';
            return;
        }

        [...feedback].sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach((item, index) => {
                const date = new Date(item.date).toLocaleDateString();
                const card = document.createElement('div');
                card.className = 'feedback-card';
                card.style.animationDelay = (index * 0.1) + 's';

                card.innerHTML = `
                    <div class="feedback-header">
                        <div>
                            <div class="feedback-mentor">${item.mentorName}</div>
                            <div class="feedback-date">${date}</div>
                        </div>
                        <button class="feedback-delete-btn" data-id="${item.id}" title="Delete">🗑️</button>
                    </div>
                    <div class="feedback-rating">
                        ${'⭐'.repeat(item.rating)}
                    </div>
                    <div class="feedback-text">${item.feedback}</div>
                `;

                timeline.appendChild(card);
            });

        document.querySelectorAll('.feedback-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const feedbackId = parseInt(e.currentTarget.dataset.id);
                if (confirm('Are you sure you want to delete this feedback?')) {
                    DataManager.deleteMentorFeedback(feedbackId);
                    UIManager.showToast('Feedback deleted!', 'success');
                    this.displayFeedback();
                }
            });
        });
    },

    openAddForm() {
        document.getElementById('feedbackForm').reset();
        document.getElementById('feedbackFormModal').classList.add('active');
        document.getElementById('ratingValue').textContent = '0';
    },

    closeForm() {
        document.getElementById('feedbackFormModal').classList.remove('active');
    },

    saveFeedback() {
        const mentorName = document.getElementById('mentorName').value.trim();
        const feedback = document.getElementById('feedbackText').value.trim();
        const rating = parseInt(document.getElementById('ratingValue').textContent);

        if (!mentorName || !feedback || rating === 0) {
            UIManager.showToast('Please fill in all fields and provide a rating', 'error');
            return;
        }

        DataManager.addMentorFeedback({
            mentorName, feedback, rating
        });

        UIManager.showToast('Feedback saved successfully!', 'success');
        this.closeForm();
        this.displayFeedback();
    }
};

// ============================================
// ANALYTICS MANAGER
// ============================================

const AnalyticsManager = {
    displayAnalytics() {
        const employabilityScore = Analytics.getEmployabilityScore();
        const gapAnalysis = Analytics.getCompetencyGapAnalysis();
        const skills = DataManager.getSkills();

        // Update employability score
        document.getElementById('employabilityScore').textContent = employabilityScore;
        UIManager.animateCircularProgress(document.getElementById('employabilityCircle'), employabilityScore);

        // Update gap analysis
        document.getElementById('strongCount').textContent = gapAnalysis.strong.length + ' skills';
        document.getElementById('moderateCount').textContent = gapAnalysis.moderate.length + ' skills';
        document.getElementById('highCount').textContent = gapAnalysis.high.length + ' skills';

        // Display skills by competency
        this.displaySkillsByCompetency(skills);
    },

    displaySkillsByCompetency(skills) {
        const container = document.getElementById('skillsByCompetency');
        container.innerHTML = '';

        if (skills.length === 0) {
            container.innerHTML = '<p class="empty-state">No skills to analyze yet.</p>';
            return;
        }

        const categories = [
            { level: 'Advanced', icon: '🚀', skills: skills.filter(s => s.progress >= 70) },
            { level: 'Intermediate', icon: '📈', skills: skills.filter(s => s.progress >= 40 && s.progress < 70) },
            { level: 'Beginner', icon: '⚠️', skills: skills.filter(s => s.progress < 40) }
        ];

        categories.forEach(cat => {
            if (cat.skills.length === 0) return;

            const section = document.createElement('div');
            section.className = 'competency-section';
            
            section.innerHTML = `
                <div class="competency-section-title">
                    ${cat.icon} ${cat.level} (${cat.skills.length})
                </div>
                <div class="competency-section-skills">
                    ${cat.skills.map(s => `<span class="competency-skill">${s.name}</span>`).join('')}
                </div>
            `;

            container.appendChild(section);
        });
    }
};

// ============================================
// SETTINGS MANAGER
// ============================================

const SettingsManager = {
    initializeSettings() {
        // Button listeners
        document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importDataBtn').addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });
        document.getElementById('importFileInput').addEventListener('change', (e) => this.importData(e));
        document.getElementById('clearDataBtn').addEventListener('click', () => this.clearData());
    },

    exportData() {
        const data = DataManager.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `skillsphere-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        UIManager.showToast('Data exported successfully!', 'success');
    },

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                if (DataManager.importData(e.target.result)) {
                    UIManager.showToast('Data imported successfully!', 'success');
                    setTimeout(() => location.reload(), 1500);
                } else {
                    UIManager.showToast('Failed to import data', 'error');
                }
            } catch (err) {
                UIManager.showToast('Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
    },

    clearData() {
        if (confirm('Are you sure? This will delete ALL your data and reset to sample data.')) {
            if (confirm('This action cannot be undone. Are you absolutely sure?')) {
                DataManager.clearAllData();
                UIManager.showToast('All data cleared and reset with sample data!', 'success');
                setTimeout(() => location.reload(), 1500);
            }
        }
    }
};

// ============================================
// CUSTOM CURSOR EFFECT
// ============================================

const CursorEffect = {
    init() {
        if (window.innerWidth <= 1024) return; // Disable on tablet/mobile

        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';

            // Smooth follower with delay
            setTimeout(() => {
                followerX = mouseX;
                followerY = mouseY;
                cursorFollower.style.left = followerX - 15 + 'px';
                cursorFollower.style.top = followerY - 15 + 'px';
            }, 100);
        });

        // Cursor effects on buttons
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                cursor.style.width = '12px';
                cursor.style.height = '12px';
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
            }
        });
    }
};

// ============================================
// EVENT LISTENERS & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize data
    DataManager.initializeSampleData();

    // Initialize UI
    UIManager.updateGreeting();
    UIManager.updateMotivationalQuote();
    UIManager.navigateTo('dashboard');

    // Custom cursor
    CursorEffect.init();

    // Update greeting and quote periodically
    setInterval(() => UIManager.updateGreeting(), 60000);

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            UIManager.navigateTo(page);
        });
    });

    document.querySelectorAll('[data-page]').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            UIManager.navigateTo(page);
        });
    });

    // Profile dropdown
    document.getElementById('profileBtn').addEventListener('click', () => {
        document.querySelector('.profile-dropdown').classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-dropdown')) {
            document.querySelector('.profile-dropdown').classList.remove('active');
        }
    });

    // Skills Page
    document.getElementById('addSkillBtn').addEventListener('click', () => SkillsManager.openAddSkillForm());
    document.getElementById('cancelSkillBtn').addEventListener('click', () => SkillsManager.closeSkillForm());
    document.getElementById('skillForm').addEventListener('submit', (e) => {
        e.preventDefault();
        SkillsManager.saveSkill();
    });

    document.getElementById('skillProgress').addEventListener('input', (e) => {
        document.getElementById('progressValue').textContent = e.target.value + '%';
    });

    document.getElementById('skillsSearchInput').addEventListener('input', () => SkillsManager.displaySkills());
    document.getElementById('categoryFilter').addEventListener('change', () => SkillsManager.displaySkills());

    // Profile Page
    document.getElementById('saveProfileBtn').addEventListener('click', () => ProfileManager.saveProfile());
    document.getElementById('fullName').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('registerNumber').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('email').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('department').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('year').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('college').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('careerGoal').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('linkedinUrl').addEventListener('input', () => ProfileManager.updateCompletion());
    document.getElementById('githubUrl').addEventListener('input', () => ProfileManager.updateCompletion());

    // Assessments Page
    document.getElementById('assessmentScore').addEventListener('input', (e) => {
        document.getElementById('assessmentScoreValue').textContent = e.target.value + '%';
        const score = parseInt(e.target.value);
        const level = Analytics.getCompetencyLevel(score);
        document.getElementById('competencyLevel').innerHTML = 
            `<span class="level-badge">${level}</span>`;
    });
    document.getElementById('assessmentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        AssessmentsManager.saveAssessment();
    });

    // Certifications Page
    document.getElementById('addCertBtn').addEventListener('click', () => CertificationsManager.openAddForm());
    document.getElementById('cancelCertBtn').addEventListener('click', () => CertificationsManager.closeForm());
    document.getElementById('certForm').addEventListener('submit', (e) => {
        e.preventDefault();
        CertificationsManager.saveCertification();
    });

    // Projects Page
    document.getElementById('addProjectBtn').addEventListener('click', () => ProjectsManager.openAddForm());
    document.getElementById('cancelProjectBtn').addEventListener('click', () => ProjectsManager.closeForm());
    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        ProjectsManager.saveProject();
    });

    // Mentor Feedback Page
    document.getElementById('addFeedbackBtn').addEventListener('click', () => MentorFeedbackManager.openAddForm());
    document.getElementById('cancelFeedbackBtn').addEventListener('click', () => MentorFeedbackManager.closeForm());
    document.getElementById('feedbackForm').addEventListener('submit', (e) => {
        e.preventDefault();
        MentorFeedbackManager.saveFeedback();
    });

    // Star rating
    document.querySelectorAll('#feedbackRating .star').forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.dataset.value);
            document.getElementById('ratingValue').textContent = rating;
            document.querySelectorAll('#feedbackRating .star').forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Settings
    SettingsManager.initializeSettings();

    // Close modals on overlay click
    document.querySelectorAll('.form-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

// Refresh dashboard on page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && document.querySelector('.page.active').id === 'dashboard-page') {
        DashboardManager.updateDashboard();
    }
});

// Handle responsive sidebar
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});
