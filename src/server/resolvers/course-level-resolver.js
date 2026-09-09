(function process( /*ResolverEnvironment*/ env) {
    try {
        var source = env.getSource();
        var levelSysId = source.level;

        if (!levelSysId) {
            return null;
        }

        var gr = new GlideRecord('cmn_skill_level');
        gr.addQuery('sys_id', levelSysId);
        gr.setLimit(1);
        gr.query();

        if (gr.next()) {
            return {
                sys_id: gr.getUniqueValue(),
                name: gr.getValue('name') || '',
                description: gr.getValue('description') || '',
                value: parseInt(gr.getValue('value') || '0', 10),
                color: gr.getValue('color') || '',
            };
        }

        return null;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveCourseLevel: ' + e.message);
        throw e;
    }
})(env);
