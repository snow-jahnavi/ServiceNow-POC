(function process( /*ResolverEnvironment*/ env) {
    try {
        var COURSE_FIELDS = 'sys_id,name,short_description,description,state,active';

        var args = env.getArguments();
        var sysId = args.sys_id;
        var description = args.description;

        if (!sysId || description === undefined) {
            return {
                success: false,
                message: 'sys_id and description are required',
                course: null,
            };
        }

        var gr = new GlideRecord('sn_lxp_content_base');
        if (gr.get(sysId)) {
            gr.setValue('description', description);
            gr.update();

            var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, 1);
            var encodedQuery = 'sys_id=' + sysId;
            var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_content_base', encodedQuery, COURSE_FIELDS);

            if (results && results.items.length > 0) {
                var rec = results.items[0];
                return {
                    success: true,
                    message: 'Course description updated successfully',
                    course: {
                        sys_id: rec.sys_id || '',
                        name: rec.name || '',
                        short_description: rec.short_description || '',
                        description: rec.description || '',
                        state: rec.state || '',
                        active: rec.active === 'true',
                    },
                };
            }

            return {
                success: true,
                message: 'Course description updated successfully',
                course: null,
            };
        }

        return {
            success: false,
            message: 'Course not found with the provided sys_id',
            course: null,
        };
    } catch (e) {
        gs.error('[LXP GraphQL] resolveUpdateCourseDescription: ' + e.message);
        throw e;
    }
})(env);
