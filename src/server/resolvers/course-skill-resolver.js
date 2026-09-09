(function process( /*ResolverEnvironment*/ env) {
    try {
        var source = env.getSource();
        var skillValue = source.skill;

        if (!skillValue) {
            return [];
        }

        // skill is a glide_list (comma-separated sys_ids)
        var skillIds = String(skillValue).split(',');
        var skills = [];

        if (skillIds.length === 0) {
            return [];
        }

        var gr = new GlideRecord('cmn_skill');
        gr.addQuery('sys_id', 'IN', skillIds.join(','));
        gr.query();

        while (gr.next()) {
            skills.push({
                sys_id: gr.getUniqueValue(),
                name: gr.getValue('name') || '',
                description: gr.getValue('description') || '',
                active: gr.getValue('active') === 'true',
                keywords: gr.getValue('keywords') || '',
                display_skill_name: gr.getValue('display_skill_name') || '',
            });
        }

        return skills;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveCourseSkills: ' + e.message);
        throw e;
    }
})(env);
