#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints'

const app = new cdk.App();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = "ap-northeast-1";

const addOns = [
  new blueprints.addons.VpcCniAddOn(),
  new blueprints.addons.CoreDnsAddOn(),
  new blueprints.addons.KubeProxyAddOn(),
  new blueprints.addons.ArgoCDAddOn(),
  new blueprints.addons.AwsLoadBalancerControllerAddOn(),
]

blueprints.EksBlueprint.builder()
  .account(account)
  .region(region)
  .addOns(...addOns)
  .build(app, "first-eks-blueprints-cdk")