(function process( /*ResolverEnvironment*/ env) {
    try {
        var COURSE_FIELDS = 'sys_id,name,short_description,description,state,type,language,rating,duration,enrollment_count,view_count,active,published,number,content_id,link,u_banner_image,skill,x_snc_nl_lxp_tags,level';

        var source = env.getSource();
        var contentSysId = source.content;

        if (!contentSysId) {
            return null;
        }

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, 1);
        var encodedQuery = 'sys_id=' + contentSysId;
        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_content_base', encodedQuery, COURSE_FIELDS);

        if (results && results.items.length > 0) {
            var rec = results.items[0];
            return {
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
            };
        }

        return null;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveUserAchievementContent: ' + e.message);
        throw e;
    }
})(env);
