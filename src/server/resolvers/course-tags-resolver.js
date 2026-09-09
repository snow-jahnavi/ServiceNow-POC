(function process( /*ResolverEnvironment*/ env) {
    try {
        var source = env.getSource();
        var tagValue = source.x_snc_nl_lxp_tags;

        if (!tagValue) {
            return [];
        }

        // x_snc_nl_lxp_tags is a glide_list (comma-separated sys_ids)
        var tagIds = String(tagValue).split(',');
        var tags = [];

        if (tagIds.length === 0) {
            return [];
        }

        var gr = new GlideRecord('x_snc_nl_lxp_tag');
        gr.addQuery('sys_id', 'IN', tagIds.join(','));
        gr.query();

        while (gr.next()) {
            tags.push({
                sys_id: gr.getUniqueValue(),
                name: gr.getValue('name') || '',
                active: gr.getValue('active') === 'true',
            });
        }

        return tags;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveCourseTags: ' + e.message);
        throw e;
    }
})(env);
