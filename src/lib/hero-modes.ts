export const heroModes = [
    {
        id: 'frontend',
        label: 'Frontend',
        noun: 'interfaces.',
        cues: ['Layout', 'Hierarchy', 'Interaction', 'Feedback'],
        title: 'Make complexity clear.',
        description:
            'Shape dense data into interfaces that are easy to read and use.',
        evidence: 'Investment research platform',
        href: '/about#project-02',
        detail: 'Data interfaces · Realtime updates',
    },
    {
        id: 'backend',
        label: 'Backend',
        noun: 'services.',
        cues: ['Request', 'Validate', 'Transform', 'Deliver'],
        title: 'Connect the moving parts.',
        description:
            'Carry information through services, integrations, and document workflows.',
        evidence: 'Property appraisal platform',
        href: '/about#project-06',
        detail: 'Request flows · Data synchronisation',
    },
    {
        id: 'qa',
        label: 'QA',
        noun: 'scenarios.',
        cues: ['Inputs', 'Boundaries', 'Journeys', 'Regression'],
        title: 'Question every assumption.',
        description:
            'Exercise real user journeys and make failures visible before release.',
        evidence: 'Automation and reliability',
        href: '/about#project-03',
        detail: 'Manual regression · Automated journeys',
    },
    {
        id: 'reliability',
        label: 'Reliability',
        noun: 'conditions.',
        cues: ['Observe', 'Diagnose', 'Recover', 'Improve'],
        title: 'Keep the whole system in view.',
        description:
            'Connect monitoring, alerts, and production support to the next improvement.',
        evidence: 'Automation and reliability',
        href: '/about#project-03',
        detail: 'Sentry · Uptime & delivery monitoring',
    },
] as const
