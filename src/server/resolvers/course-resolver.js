
(function process( /*ResolverEnvironment*/ env) {
    try {
        gs.info("[LXP GraphQL] called");
        var LOG_PREFIX = '[LXP GraphQL] ';
        var COURSE_FIELDS = 'sys_id,name,short_description,description,state,type,language,rating,duration,enrollment_count,view_count,active,published,number,content_id,link,u_banner_image,skill,x_snc_nl_lxp_tags,level';

        const args = env.getArguments()
        const limit = args.limit || 20
        const active = args.active
        const state = args.state

        // --- New: sn_lxp.LearningAPI implementation ---
        var learningAPI = new sn_lxp.LearningAPI({
            queryParams: {}}, {}, limit);

        const queryParts = []
        if (active !== undefined && active !== null) {
            queryParts.push('active=' + active)
        }
        if (state) {
            queryParts.push('state=' + state)
        }
        const encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on'
        gs.info(
            LOG_PREFIX + 'test'
        )
        const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_course', encodedQuery, COURSE_FIELDS)
        gs.info(
            LOG_PREFIX + 'resolveCourses: Found ' + results.items.length + ' courses'
        )
        const courses = []
        for (let i = 0; i < results.items.length; i++) {
            const rec = results.items[i]
            courses.push({
                sys_id: rec.sys_id || '',
                name: rec.name || '',
                short_description: rec.short_description || '',
                description: rec.description || '',
                state: rec.state || '',
                type: rec.type || '',
                language: rec.language || '',
                rating: parseFloat(rec.rating || '0'),
                duration: rec.duration || '',
                enrollment_count: parseInt(rec.enrollment_count || '0', 10),
                view_count: parseInt(rec.view_count || '0', 10),
                active: rec.active === 'true',
                published: rec.published || '',
                number: rec.number || '',
                content_id: rec.content_id || '',
                link: gs.getProperty('glide.servlet.uri') + 'lxp/en?id=learning_course_prev&course_id=' + (rec.sys_id || ''),
                u_banner_image: rec.u_banner_image || '',
                skill: rec.skill || '',
                x_snc_nl_lxp_tags: rec.x_snc_nl_lxp_tags || '',
                level: rec.level || '',
            })
        }

        return courses

        // --- Old: GlideRecord implementation ---
        // const gr = new GlideRecord('sn_lxp_content_base')
        //
        // if (active !== undefined && active !== null) {
        //     gr.addQuery('active', active)
        // }
        // if (state) {
        //     gr.addQuery('state', state)
        // }
        //
        // gr.setLimit(limit)
        // gr.orderByDesc('sys_created_on')
        // gr.query()
        //
        // const courses = []
        // while (gr.next()) {
        //     courses.push({
        //         sys_id: gr.getUniqueValue(),
        //         name: gr.getValue('name') || '',
        //         short_description: gr.getValue('short_description') || '',
        //         description: gr.getValue('description') || '',
        //         state: gr.getValue('state') || '',
        //         type: gr.getValue('type') || '',
        //         language: gr.getValue('language') || '',
        //         rating: parseFloat(gr.getValue('rating') || '0'),
        //         duration: gr.getValue('duration') || '',
        //         enrollment_count: parseInt(gr.getValue('enrollment_count') || '0', 10),
        //         view_count: parseInt(gr.getValue('view_count') || '0', 10),
        //         active: gr.getValue('active') === 'true',
        //         published: gr.getValue('published') || '',
        //         number: gr.getValue('number') || '',
        //         content_id: gr.getValue('content_id') || '',
        //     })
        // }
        //
        // return courses
    } catch (e) {
        gs.error(LOG_PREFIX + 'resolveCourses: ', e);
        throw e
    }
})(env);
