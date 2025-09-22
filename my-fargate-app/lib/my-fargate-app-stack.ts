import * as cdk from "aws-cdk-lib"; // ここを aws-cdk-lib に変更
import * as ec2 from "aws-cdk-lib/aws-ec2"; // ここを aws-cdk-lib/aws-ec2 に変更
import * as ecs from "aws-cdk-lib/aws-ecs"; // ここを aws-cdk-lib/aws-ecs に変更
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns"; // ここを aws-cdk-lib/aws-ecs-patterns に変更
import { Construct } from "constructs"; // Construct は constructs ライブラリからimportします

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
    const accountId = "your-account-id"; // AWSアカウントIDを指定
    const fargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(
        this,
        "MyFargateService",
        {
          cluster,
          taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry(
              `${accountId}.dkr.ecr.your-region.amazonaws.com/your-repo-name:latest`
            ),
            containerPort: 80,
          },
          publicLoadBalancer: true, // ロードバランサーをパブリックに公開
          listenerPort: 80, // ロードバランサーのリスナーポート
        }
      );
  }
}
