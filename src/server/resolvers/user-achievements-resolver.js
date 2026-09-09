(function process( /*ResolverEnvironment*/ env) {
    try {
        var USER_ACHIEVEMENT_FIELDS = 'sys_id,user,content,achievement,earned_on,number,sys_created_on,sys_updated_on';

        var args = env.getArguments();
        var limit = args.limit || 20;
        var userId = args.user_id;

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, limit);

        var queryParts = [];
        if (userId) {
            queryParts.push('user=' + userId);
        }
        var encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on';

        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_user_achievement', encodedQuery, USER_ACHIEVEMENT_FIELDS);

        var records = [];
        for (var i = 0; i < results.items.length; i++) {
            var rec = results.items[i];
            records.push({
                sys_id: rec.sys_id || '',
                user: rec.user || '',
                content: rec.content || '',
                achievement: rec.achievement || '',
                earned_on: rec.earned_on || '',
                number: rec.number || '',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
            });
        }

        return records;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveUserAchievements: ' + e.message);
        throw e;
    }
})(env);
