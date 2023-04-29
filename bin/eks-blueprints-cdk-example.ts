#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints'
import { ArnPrincipal } from "@aws-quickstart/eks-blueprints/node_modules/aws-cdk-lib/aws-iam";
import { ApplicationTeam, PlatformTeam } from '@aws-quickstart/eks-blueprints'

const app = new cdk.App();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = "ap-northeast-1";

// プラットフォームチーム
const admin = new PlatformTeam({
  name: "admin",
  users: [
    new ArnPrincipal(`arn:aws:iam::${account}:user/admin`)
  ],
});
// アプリケーションチーム: burnham
const burnham = new ApplicationTeam({
  name: "burnham",
  users: [
    new ArnPrincipal(`arn:aws:iam::${account}:user/admin`)
  ],
});
// アプリケーションチーム: riker
const riker = new ApplicationTeam({
  name: "riker",
  users: [
    new ArnPrincipal(`arn:aws:iam::${account}:user/admin`)
  ],
});
// アプリケーションチーム: geordie
const geordie = new ApplicationTeam({
  name: "geordie",
  users: [
    new ArnPrincipal(`arn:aws:iam::${account}:user/admin`)
  ],
});
// アプリケーションチーム: carmen
const carmen = new ApplicationTeam({
  name: "carmen",
  users: [
    new ArnPrincipal(`arn:aws:iam::${account}:user/admin`)
  ],
});

const addOns = [
  new blueprints.addons.VpcCniAddOn(),
  new blueprints.addons.CoreDnsAddOn(),
  new blueprints.addons.KubeProxyAddOn(),
  new blueprints.addons.ArgoCDAddOn(),
  new blueprints.addons.AwsLoadBalancerControllerAddOn(),
]

blueprints.EksBlueprint.builder()
  .account(account)
  .teams(admin, burnham, riker, geordie, carmen) // Team指定
  .region(region)
  .addOns(...addOns)
  .build(app, "first-eks-blueprints-cdk")