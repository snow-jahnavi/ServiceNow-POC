(function process( /*ResolverEnvironment*/ env) {
    try {
        var USER_ACHIEVEMENT_FIELDS = 'sys_id,user,content,achievement,earned_on,number,sys_created_on,sys_updated_on';

        var args = env.getArguments();
        var sysId = args.sys_id;

        if (!sysId) {
            return null;
        }

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, 1);
        var encodedQuery = 'sys_id=' + sysId;
        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_user_achievement', encodedQuery, USER_ACHIEVEMENT_FIELDS);

        if (results && results.items.length > 0) {
            var rec = results.items[0];
            return {
                sys_id: rec.sys_id || '',
                user: rec.user || '',
                content: rec.content || '',
                achievement: rec.achievement || '',
                earned_on: rec.earned_on || '',
                number: rec.number || '',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
            };
        }

        return null;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveUserAchievement: ' + e.message);
        throw e;
    }
})(env);
