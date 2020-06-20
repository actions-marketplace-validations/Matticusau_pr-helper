//
// Author:  Matt Lavery
// Date:    2020-06-18
// Purpose: Pull Request Merge handler
//
// When         Who         What
// ------------------------------------------------------------------------------------------
// 2020-06-20   MLavery     Config moved back to workflow file #3
//

import { CoreModule, GitHubModule, Context } from './types' // , Client
import { IssueLabels, PRHelper, MessageHelper } from './classes';

export default async function prMergeHandler(core: CoreModule, github: GitHubModule) {

  try {

    const messageHelper = new MessageHelper;
    
    // make sure we should proceed
    // core.debug('config.configuration.prmerge.check: ' + JSON.stringify(config.configuration.prmerge.check));
    if (core.getInput('enable-prmerge-automation') === 'true') {
      const prhelper = new PRHelper;
      const prnumber = prhelper.getPrNumber(github.context);
      if (!prnumber) {
        core.info('Could not get pull request number from context, may not be a pull request event, exiting');
        return;
      }
      core.info(`Processing PR ${prnumber}!`);
    
      // This should be a token with access to your repository scoped in as a secret.
      // The YML workflow will need to set myToken with the GitHub Secret Token
      // myToken: ${{ secrets.GITHUB_TOKEN }}
      // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
      const myToken = core.getInput('repo-token');

      const octokit = github.getOctokit(myToken);
      
      const { data: pullRequest } = await octokit.pulls.get({
          ...github.context.repo,
          pull_number: prnumber,
      });

      // make sure we have the correct merge method from config
      prhelper.setMergeMethod(core.getInput('permerge-method'));

      // merge the PR if criteria is met
      if (prhelper.isMergeReadyByState(core, pullRequest)) {
        if (await prhelper.isMergeReadyByLabel(core, github, pullRequest)) {
          if (await prhelper.isMergeReadyByChecks(core, github, pullRequest)){
            if (await prhelper.isMergeReadyByReview(core, github, pullRequest)){
              core.info(`Merged PR #${pullRequest.number}`);
              await octokit.pulls.merge({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                pull_number: pullRequest.number,
                sha : pullRequest.head.sha, // safe guard no other pushes since starting action
                merge_method: prhelper.mergemethod,
              });
            }
          } else {
            core.info(`PR #${prnumber} not all checks have completed, merge not possible at this time`);
          }
        } else {
          core.info(`PR #${prnumber} labels do not allow merge`);
        }
      } else {
        core.info(`PR #${prnumber} is closed, no action taken`);
      }
    }
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}