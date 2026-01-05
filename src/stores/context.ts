import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export interface Company {
    id: number;
    nombre: string;
    pais: string;
    identificador: string;
    tipo_identificador: string;
    rol_empresa?: string;
}

export interface AccessMode {
    type: 'company' | 'admin';
    empresa?: Company;
    rol?: string;
    empresa_id?: number;
}

export const useContextStore = defineStore('context', () => {
    const availableContexts = ref<Company[]>([]);
    const currentContext = ref<Company | null>(null);

    // Getters
    const hasContext = computed(() => !!currentContext.value);
    
    // Actions
    function setAvailableContexts(contexts: Company[]) {
        availableContexts.value = contexts;
    }

    function selectContext(companyId: number) {
        const found = availableContexts.value.find(c => c.id === companyId);
        if (found) {
            currentContext.value = found;
            // Here we might persist to localStorage if needed
            localStorage.setItem('current_context', JSON.stringify(found));
        }
    }

    function clearContext() {
        currentContext.value = null;
        availableContexts.value = [];
        localStorage.removeItem('current_context');
    }

    // Initialize from storage if available
    function initialize() {
        const stored = localStorage.getItem('current_context');
        if (stored) {
            try {
                currentContext.value = JSON.parse(stored);
            } catch (e) {
                localStorage.removeItem('current_context');
            }
        }
    }

    return {
        availableContexts,
        currentContext,
        hasContext,
        setAvailableContexts,
        selectContext,
        clearContext,
        initialize
    };
});
