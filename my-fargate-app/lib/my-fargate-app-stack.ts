import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam"; // ここを aws-cdk-lib/aws-iam に変更

export class MyFargateAppStack extends cdk.Stack {
  // cdk.Construct ではなく、importした Construct を使用します
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPCの作成
    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 2, // 可用性ゾーンの数
    });

    // ECSクラスターの作成
    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc,
    });

    // Fargateサービスの作成
    const accountId = ""; // AWSアカウントIDを指定
    const region = "ap-northeast-1";
    const repositoryName = "sso-sample-app-repository";
    const fargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(
        this,
        "MyFargateService",
        {
          cluster,
          taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry(
              `${accountId}.dkr.ecr.${region}.amazonaws.com/${repositoryName}:latest`
            ),
            containerPort: 80,
          },
          publicLoadBalancer: true,
          listenerPort: 80,
        }
      );

    fargateService.taskDefinition.executionRole?.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AmazonECSTaskExecutionRolePolicy"
      )
    );

    fargateService.taskDefinition.executionRole?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["ecr:*"],
        resources: ["*"],
      })
    );

    // デプロイ後にALBのエンドポイントを出力する
    new cdk.CfnOutput(this, "FargateServiceURL", {
      value: `http://${fargateService.loadBalancer.loadBalancerDnsName}`,
      description: "Public endpoint (ALB DNS) for the Fargate service",
    });
  }
}
